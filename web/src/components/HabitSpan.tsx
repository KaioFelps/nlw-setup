import * as Popover from "@radix-ui/react-popover"
import clsx from "clsx";
import { ProgressBar } from "./ProgressBar";

type HabitSpanProps = {
    isFake?: boolean;
    completedHabitsLength?: number;
    availableHabitsLength?: number;
}

export function HabitSpan({ isFake, availableHabitsLength, completedHabitsLength }: HabitSpanProps) {
    const MAX_PERCENTAGE = 100
    const percentage = Math.round(Number((completedHabitsLength! * MAX_PERCENTAGE) / availableHabitsLength!))


    if(isFake) return <span className="w-10 h-10 bg-zinc-900 border border-zinc-800 rounded-lg opacity-50 cursor-not-allowed" />
    
    return (
        <Popover.Root>
            <Popover.Trigger
                className={clsx("w-10 h-10 border-2 rounded-lg", {
                    "bg-zinc-900 border-zinc-800": percentage == 0 && percentage < 20,
                    "bg-violet-900 border-violet-700": percentage >= 20 && percentage < 40,
                    "bg-violet-800 border-violet-600": percentage >= 40 && percentage < 60,
                    "bg-violet-700 border-violet-500": percentage >= 60 && percentage < 80,
                    "bg-violet-600 border-violet-500": percentage >= 80 && percentage < 100,
                    "bg-violet-500 border-violet-400": percentage == 100
                })}
            />

            <Popover.Portal>
                <Popover.Content side="left" className="min-w-[320px] max-w-[90%] p-6 rounded-2xl bg-zinc-900 flex flex-col">
                    <span className="font-semibold text-zinc-400">terça-feira</span>
                    <span className="mt-1 font-extrabold leading-tight text-3xl">20/01</span>

                    <ProgressBar progress={percentage} />

                    <Popover.Arrow width={16} height={8} className="fill-zinc-900" />
                </Popover.Content>
            </Popover.Portal>
        </Popover.Root>
    )
}