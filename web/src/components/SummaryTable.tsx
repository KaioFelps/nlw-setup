import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { api } from "../lib/axios";
import { generateDatesFromYearBeginning } from "../utils/generate-dates-fom-year-beginning";
import { HabitSpan } from "./HabitSpan";
import { SummaryWeekDay } from "./SummaryWeekDay";

type SummaryType = {
    id: string;
    date: string;
    completedHabitsLength: number;
    availableHabitsLength: number;
}[]

export function SummaryTable() {
    const weekDays = ["D", "S", "T", "Q", "Q", "S", "S"]
    const summaryDates = generateDatesFromYearBeginning()
    const [ summaryData, setSummaryData ] = useState<SummaryType>([])

    const minimumSummaryDatesLength = 18 * 7 // 18 semanas
    const daysToFill = minimumSummaryDatesLength - summaryDates.length

    useEffect(() => {
        api.get("summary")
        .then(res => setSummaryData(res.data))        
    }, [])

    return (
        <main className="w-full flex gap-3">
            <header className="grid grid-rows-7 grid-flow-row gap-2">
                {weekDays.map((day, index) => {
                    return <SummaryWeekDay key={index}>{day}</SummaryWeekDay>
                })}
            </header>
            <section className="grid grid-rows-7 grid-flow-col gap-2 overflow-x-overlay scrollbar-hide">
                {summaryDates.map(date => {
                    const dayInSummary = summaryData.find(day => {
                        return dayjs(date).isSame(day.date, "day")
                    })

                    return <HabitSpan
                                key={date.toString()}
                                date={date}
                                availableHabitsLength={dayInSummary?.availableHabitsLength}
                                completedHabitsLength={dayInSummary?.completedHabitsLength}
                            />
                })}

                {daysToFill > 0 ? Array.from({length: daysToFill}).map((_, i) => {
                    return <HabitSpan key={i} isFake />
                }) : null}
            </section>
        </main>
    )
}