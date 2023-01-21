import { View , Text, ScrollView} from "react-native";
import { HabitDay } from "../components/HabitDay";
import { Header } from "../components/Header";
import { generateDatesFromYearBeginning } from "../utils/generate-dates-from-year-beginning";

import { HABIT_DAY_SIZE } from "../components/HabitDay";
import { useNavigation } from "@react-navigation/native"

const weekDays = ["D", "S", "T", "Q", "Q", "S", "S"]
const datesFromYearsBeginning = generateDatesFromYearBeginning()
const minimumSummaryDatesLength = 18 * 5
const daysToFill = minimumSummaryDatesLength - datesFromYearsBeginning.length

export function Home() {
    const { navigate } = useNavigation()

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
                <View
                    className="flex flex-row flex-wrap"
                >
                    {datesFromYearsBeginning.map(date => {
                        return (
                            <HabitDay
                                key={date.toString()}
                                onPress={() => navigate("habit", {date: date.toISOString()})}
                            />
                        )
                    })}

                    {daysToFill > 0 ? Array.from({length: daysToFill}).map((_, i) => {
                        return <HabitDay key={i} isFake />
                    }) : null}
                </View>
            </ScrollView>
            
        </View>
    )
} 