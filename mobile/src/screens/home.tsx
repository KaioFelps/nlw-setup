import { api } from "../lib/axios";
import { generateDatesFromYearBeginning } from "../utils/generate-dates-from-year-beginning";

import { HabitDay, HABIT_DAY_SIZE } from "../components/HabitDay";
import { useFocusEffect, useNavigation } from "@react-navigation/native"
import { useCallback, useState } from "react";
import { Loading } from "../components/Loading";
import dayjs from "dayjs";
import { Alert, View, Text, ScrollView } from "react-native";
import { Header } from "../components/Header";

const weekDays = ["D", "S", "T", "Q", "Q", "S", "S"]
const datesFromYearsBeginning = generateDatesFromYearBeginning()
const minimumSummaryDatesLength = 18 * 5
const daysToFill = minimumSummaryDatesLength - datesFromYearsBeginning.length

type SummaryType = {
    id: string;
    date: Date;
    completedHabitsLength: number;
    availableHabitsLength: number;
}

export function Home() {
    const { navigate } = useNavigation()
    const [ loading, setLoading ] = useState(true)
    const [ summaryData, setSummaryData ] = useState<SummaryType[]>([])

    async function fetchData() {
        try {
            setLoading(true)
            const response = await api.get("summary")

            setSummaryData(response.data)
        }
        catch (error) {
            Alert.alert("Ops, algo deu errado!", `${error}`)
            console.log(error)
        }
        finally {
            setLoading(false)
        }
    }

    useFocusEffect(useCallback(() => {
        fetchData()
    }, []))

    if (!!loading) return <Loading />

    return (
        <View className="bg-background flex-1 px-8 pt-16 text-white">
            <Header />

            <View className="flex flex-row mt-6 mb-2">
                {
                    weekDays.map((day, i) => {
                        return (
                            <Text
                                key={i}
                                className="text-white text-xl font-bold text-center mx-1"
                                style={{width: HABIT_DAY_SIZE}}
                            >
                                {day}
                            </Text>
                        )
                    })
                }
            </View>

            <ScrollView showsVerticalScrollIndicator={false}contentContainerStyle={{paddingBottom: 100}} >
                {!!summaryData ?
                <View
                    className="flex flex-row flex-wrap"
                >
                    {datesFromYearsBeginning.map(date => {
                        const thisSummaryData = summaryData.find(day => dayjs(date).isSame(day.date, "day"))

                        return (
                            <HabitDay
                                key={date.toString()}
                                date={date}
                                completedHabitsLength={thisSummaryData?.completedHabitsLength}
                                availableHabitsLength={thisSummaryData?.availableHabitsLength}
                                onPress={() => navigate("habit", {date: date.toISOString()})}
                            />
                        )
                    })}

                    {daysToFill > 0 ? Array.from({length: daysToFill}).map((_, i) => {
                        return <HabitDay key={i} isFake />
                    }) : null}
                </View>
            : null}
            </ScrollView>
            
        </View>
    )
} 