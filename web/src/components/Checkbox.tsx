import { ReactNode } from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { Check } from "phosphor-react";
import colors from "tailwindcss/colors";

type CheckboxProps = CheckboxPrimitive.CheckboxProps & {
    children: ReactNode;
    isChecked?: boolean;
}

export function Checkbox({ children, isChecked, ...rest }: CheckboxProps) {
    return (
        <CheckboxPrimitive.Root
            className="group flex flex-row items-center gap-3 focus:outline-none"
            {...rest}
        >
            <div
                className="
                h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 transition-all delay-75
                group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500 group-focus:outline-4 group-focus:outline outline-green-500/25 group-disabled:cursor-not-allowed
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