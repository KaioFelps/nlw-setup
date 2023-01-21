import { TouchableOpacity, View, Text, TouchableOpacityProps } from "react-native";
import { Feather } from "@expo/vector-icons"
import colors from "tailwindcss/colors";
import { ReactNode } from "react"

type CheckboxProps = TouchableOpacityProps & {
    isChecked?: boolean
    children: ReactNode;
}

export function Checkbox({isChecked = false, children, ...rest}:CheckboxProps) {
    return (
        <TouchableOpacity
            activeOpacity={0.7}
            className="flex flex-row mb-2 items-center gap-x-3 mt-0"
            {...rest}
        >
            {isChecked ?
            <View className="h-8 w-8 bg-green-500 rounded-lg flex items-center justify-center">
                <Feather
                    name="check"
                    size={20}
                    color={colors.white}
                />
            </View> :
            <View
                className="h-8 w-8 bg-zinc-900 border-2 border-zinc-800 rounded-lg"
            />
            }

            <Text className="text-white text-base font-semibold">
                {children}
            </Text>
        </TouchableOpacity>
    )
}