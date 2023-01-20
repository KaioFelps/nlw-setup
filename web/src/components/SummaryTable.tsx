import { generateDatesFromYearBeginning } from "../utils/generate-dates-fom-year-beginning";
import { HabitSpan } from "./HabitSpan";
import { SummaryWeekDay } from "./SummaryWeekDay";

export function SummaryTable() {
    const weekDays = ["D", "S", "T", "Q", "Q", "S", "S"]
    const summaryDates = generateDatesFromYearBeginning()

    const minimumSummaryDatesLength = 18 * 7 // 18 semanas
    const daysToFill = minimumSummaryDatesLength - summaryDates.length

    return (
        <main className="w-full flex gap-3">
            <header className="grid grid-rows-7 grid-flow-row gap-2">
                {weekDays.map((day, index) => {
                    return <SummaryWeekDay key={index}>{day}</SummaryWeekDay>
                })}
            </header>
            <section className="grid grid-rows-7 grid-flow-col gap-2 overflow-x-overlay scrollbar-hide">
                {summaryDates.map(date => {
                    return <HabitSpan
                                key={date.toString()}
                                availableHabitsLength={5}
                                completedHabitsLength={Math.round(Math.random() * 5)}
                            />
                })}

                {daysToFill > 0 ? Array.from({length: daysToFill}).map((_, i) => {
                    return <HabitSpan key={i} isFake />
                }) : null}
            </section>
        </main>
    )
}