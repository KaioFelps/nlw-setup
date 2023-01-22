import { ScrollView, View, Text, Alert } from "react-native";
import { useRoute } from "@react-navigation/native"
import { BackButton } from "../components/BackButton";
import { ProgressBar } from "../components/ProgressBar";
import { Checkbox } from "../components/Checkbox";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { Loading } from "../components/Loading";
import { api } from "../lib/axios";
import { generateProgressPercentage } from "../utils/generate-progress-percentage";
import { NoHabits } from "../components/NoHabits";
import clsx from "clsx";

type Params = {
    date: string;
}

type HabitsListType = {
    possibleHabits: {
        id: string;
        title: string;
        created_at: Date;
    }[];
    completedHabits: string[]
}

export function Habit() {
    const route = useRoute()
    const { date } = route.params as Params
    const [ isLoading, setIsLoading ] = useState(true)
    const [ habitsList, setHabitsList ] = useState<HabitsListType>()
    const [ completedHabits, setCompletedHaibts ] = useState<string[]>([])

    const parsedDate = dayjs(date);
    const weekDay = parsedDate.format("dddd");
    const dayAndMonth = parsedDate.format("DD/MM")

    async function fetchHabits() {
        try {
            setIsLoading(true)

            const response = await api.get(`day?date=${date}`)
            setHabitsList(response.data)
            setCompletedHaibts(response.data.completedHabits)
        }
        catch (error) {
            console.log(error)
            Alert.alert("Ops, algo deu errado =(", "Não foi possível carregar as informações dos hábitos")
        }
        finally {
            setIsLoading(false)
        }
    }

    async function handleToggleHabit(habitId: string) {
        try {
            await api.patch(`habits/${habitId}/toggle`)

            if(completedHabits.includes(habitId)) {
                setCompletedHaibts(prevState => prevState.filter(habit => habit !== habitId))
                return;
            }

            setCompletedHaibts(prevState => [...prevState, habitId])
        }
        catch (error) {
            console.log(error)
            Alert.alert("Ops", "algo deu errado durante a mudança de status desse hábito...")
        }
    }

    useEffect(() => {
        fetchHabits()
    }, [])

    const progressPorcentage = !habitsList?.possibleHabits ? 0 : generateProgressPercentage(habitsList.possibleHabits.length, completedHabits.length)
    const hasDayPassed = dayjs(date).endOf("day").isBefore(new Date())

    if (!!isLoading) return <Loading />

    return (
        <View
            className="flex-1 bg-background px-8 pt-16"
        >
            <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingBottom: 64}}
            >
                <BackButton />

                <Text className="mt-6 text-base font-semibold text-zinc-400">{weekDay}</Text>
                <Text className="mt-2 text-white font-extrabold text-3xl">{dayAndMonth}</Text>

                <ProgressBar progress={progressPorcentage} />

                <View className={clsx("mt-6", {
                    "opacity-50": hasDayPassed
                })}>
                    {!habitsList?.possibleHabits || habitsList?.possibleHabits.length === 0  ? <NoHabits /> :
                        habitsList?.possibleHabits.map((habit) => {
                            return (
                                <Checkbox 
                                    key={habit.id}
                                    isChecked={completedHabits.includes(habit.id)}
                                    onPress={() => handleToggleHabit(habit.id)}
                                    disabled={hasDayPassed}
                                >
                                    {habit.title}
                                </Checkbox>
                            )
                        })
                    }
                </View>
                {
                    hasDayPassed ?
                    <Text className="text-red-300 mt-10 text-center">
                        Você não pode editar hábitos de uma data passada.
                    </Text>
                    : null
                }
            </ScrollView>
        </View>
    )
}