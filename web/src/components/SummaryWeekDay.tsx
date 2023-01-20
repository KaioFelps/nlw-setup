import { ReactNode } from "react";

export function SummaryWeekDay({children}: {children: ReactNode}) {
    return (
        <div className="text-zinc-400 text-xl h-10 w-10 flex items-center justify-center font-bold">
            {children}
        </div>
    )
}