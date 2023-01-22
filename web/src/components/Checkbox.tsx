import { ReactNode } from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { Check } from "phosphor-react";
import colors from "tailwindcss/colors";

type CheckboxProps = {
    children: ReactNode;
}

export function Checkbox({ children }: CheckboxProps) {
    return (
        <CheckboxPrimitive.Root
            className="group flex flex-row items-center gap-3"
        >
            <div
                className="
                h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800
                group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500
                "
            >
                <CheckboxPrimitive.Indicator>
                    <Check size={20} weight="bold" color={colors.white} />
                </CheckboxPrimitive.Indicator>
            </div>

            <span className="
                font-semibold text-xl text-white leading-tigh
                group-data-[state=checked]:line-through group-data-[state=checked]:text-zinc-400
            ">
                {children}
            </span>
        </CheckboxPrimitive.Root>
    )
}