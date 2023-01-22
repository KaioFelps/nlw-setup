import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { api } from "../lib/axios";
import { Checkbox } from "./Checkbox";

type HabitPopoverListProps = {
    date?: Date;
    onCompletedChange: (completed: number) => void;
}

type HabitsInfoType = {
    possibleHabits: Array<{
        id: string;
        title: string;
        created_at: string;
    }>,
    completedHabits: string[];
}

export function HabitPopoverList({ date, onCompletedChange }: HabitPopoverListProps) {

    if(!date) return <span className="text-red-600 border-2 border-red-600 bg-red-600/10 rounded-lg p-4 text-center mt-6">Algo deu errado =(</span>

    const [ habitsList, setHabitsList ] = useState<HabitsInfoType>()

    useEffect(() => {
        api.get("day", {
            params: {
                date: date.toISOString(),
            }
        })
        .then(res => setHabitsList(res.data))
    }, [])
    
    const hasDatePassed = dayjs(date)
        .endOf("day")
        .isBefore(new Date())
    
    async function handleToggleHabitStatus(habitId: string) {
        await api.patch(`habits/${habitId}/toggle`)

        const hasHabitBeenCompleted = habitsList?.completedHabits.includes(habitId)

        let completedHabits = []

        if (hasHabitBeenCompleted) {
            completedHabits = habitsList!.completedHabits.filter(habit => habit !== habitId)
        }
        else {
            completedHabits = [...habitsList!.completedHabits, habitId]
        }

        setHabitsList({
            possibleHabits: habitsList!.possibleHabits,
            completedHabits,
        })
        onCompletedChange(completedHabits.length)
    }

    return (
        <div className="mt-6 flex flex-col gap-3">
            {habitsList?.possibleHabits.map((habit) => {
                return (
                    <Checkbox
                        defaultChecked={habitsList.completedHabits.includes(habit.id)}
                        key={habit.id}
                        disabled={hasDatePassed}
                        onCheckedChange={() => handleToggleHabitStatus(habit.id)}
                        >
                            {habit.title}
                        </Checkbox>
                )
            })}
        </div>
    )
}