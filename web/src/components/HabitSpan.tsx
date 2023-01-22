import * as Popover from "@radix-ui/react-popover"
import clsx from "clsx";
import dayjs from "dayjs";
import { useState } from "react";
import { HabitPopoverList } from "./HabitPopoverList";
import { ProgressBar } from "./ProgressBar";

type HabitSpanProps = {
    isFake?: boolean;
    date?: Date;
    defaultCompletedLength?: number;
    availableHabitsLength?: number;
}

export function HabitSpan({ isFake, availableHabitsLength = 0, defaultCompletedLength = 0, date }: HabitSpanProps) {
    if(isFake) return <span className="w-10 h-10 bg-zinc-900 border border-zinc-800 rounded-lg opacity-50 cursor-not-allowed" />

    const [ completedHabitsLength, setCompletedHabitsLength ] = useState(defaultCompletedLength)
    
    const MAX_PERCENTAGE = 100
    const percentage = availableHabitsLength > 0 ? Math.round(Number((completedHabitsLength * MAX_PERCENTAGE) / availableHabitsLength!)) : 0

    const weekDay = dayjs(date).format("dddd")
    const dayAndMonth = dayjs(date).format("DD/MM")


    function handleCompletedHabitsLengthChange(completed: number) {
        setCompletedHabitsLength(completed)
    }

    return (
        <Popover.Root>
            <Popover.Trigger
                className={clsx("w-10 h-10 border-2 rounded-lg bg-zinc-900 border-zinc-800 focus:outline-none focus:ring-4 focus:ring-violet-500/50 data-[state=open]:bg-zinc-900data-[state=open]:border-4 data-[state=open]:border-white", {
                    "bg-violet-900 border-violet-700": percentage >= 20 && percentage < 40,
                    "bg-violet-800 border-violet-600": percentage >= 40 && percentage < 60,
                    "bg-violet-700 border-violet-500": percentage >= 60 && percentage < 80,
                    "bg-violet-600 border-violet-500": percentage >= 80 && percentage < 100,
                    "bg-violet-500 border-violet-400": percentage == 100
                })}
            />

            <Popover.Portal>
                <Popover.Content sideOffset={4} side="left" className="min-w-[320px] max-w-[90%] p-6 rounded-2xl bg-zinc-900 flex flex-col">
                    <span className="font-semibold text-zinc-400">{weekDay}</span>
                    <span className="mt-1 font-extrabold leading-tight text-3xl">
                        {dayAndMonth}
                    </span>

                    <ProgressBar progress={percentage} />
                    <HabitPopoverList onCompletedChange={handleCompletedHabitsLengthChange} date={date} />

                    <Popover.Arrow width={22} height={12} className="fill-zinc-900" />
                </Popover.Content>
            </Popover.Portal>
        </Popover.Root>
    )
}