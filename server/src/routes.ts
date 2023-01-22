import dayJs from "dayjs"
import { FastifyInstance } from "fastify"
import { prisma } from "./lib/prisma"
import { z } from "zod"

export async function appRoutes(app: FastifyInstance) {
    app.post("/habits", async (request) => {
        // valida e traz a tipagem
        const createHabitBody = z.object({
            title: z.string(),
            weekDays: z.array(z.number().min(0).max(6))
        })

        const { title, weekDays } = createHabitBody.parse(request.body)

        const today = dayJs().startOf("day").toDate()

        await prisma.habit.create({
            data: {
                title,
                created_at: today,
                weekDays: {
                    create: weekDays.map(weekDay => {
                        return {
                            week_day: weekDay
                        }
                    })
                }
            },
        })
    })

    app.get("/day", async (request) => {
        const getDayParams = z.object({
            date: z.coerce.date() // coerce converterá o parâmetro recebido em string em uma data
        })

        const { date } = getDayParams.parse(request.query)

        const parsedDate = dayJs(date).startOf("day")
        const weekDay = dayJs(parsedDate).get("day") // retorna dia da semana, 0 - 1 - 2 - 3...

        const possibleHabits = await prisma.habit.findMany({
            where: {
                created_at: {
                    lte: date, // verifica se a data da db é maior que a data fornecida
                },
                weekDays: {
                    some: {
                        week_day: weekDay,
                    }
                }
            }
        })

        const day = await prisma.day.findUnique({
            where: {
                date: parsedDate.toDate(),
            },
            include: {
                dayHabits: true,
            }
        })

        const completedHabits = day?.dayHabits.map(dayHabit => {
            return dayHabit.habit_id
        }) ?? []

        return {
            possibleHabits,
            completedHabits
        }
    })

    // patch é para alterar, ou criar também
    app.patch("/habits/:id/toggle", async (request) => {
        const toggleHabitParams = z.object({
            id: z.string().uuid(),
        })

        const { id } = toggleHabitParams.parse(request.params)
        const today = dayJs().startOf("day").toDate()

        let day = await prisma.day.findUnique({
            where: {
                date: today, // é igual ao today
            }
        })

        if (!day) {
            day = await prisma.day.create({
                data: {
                    date: today,
                }
            })
        }

        const dayHabit = await prisma.dayHabit.findUnique({
            where: {
                day_id_habit_id: {
                    day_id:day.id,
                    habit_id: id,
                }
            }
        })

        if (!!dayHabit && !(dayHabit.id === "")) {
            await prisma.dayHabit.delete({
                where: {
                    id: dayHabit.id
                }
            })
        } else {
            // completamos o hábito nesse dia
            await prisma.dayHabit.create({
                data: {
                    day_id: day.id,
                    habit_id: id,
                }
            })
        }
    })

    app.get("/summary", async () => {
        const summary = await prisma.$queryRaw`
            SELECT
                D.id,
                D.date,
                (
                    SELECT
                        cast(count(*) as float)
                    FROM day_habits DH
                    WHERE DH.day_id = D.id
                ) as completedHabitsLength,
                (
                    SELECT
                        cast(count(*) as float)
                    FROM habit_week_days HWD
                    JOIN habits H
                        ON H.id = HWD.habit_id
                    WHERE
                        HWD.week_day = cast(strftime('%w', D.date/1000.0, 'unixepoch') as int)
                        -- %w retorna o dia da semana começando no 0 - domingo, unicepoch é o tipo de data que estamos usando, retorna strnig por isso o cast as int
                        AND H.created_at <= D.date
                 ) as availableHabitsLength
            FROM days D
        `

        return summary
    })
}