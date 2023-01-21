import { TouchableOpacity, Dimensions, View, TouchableOpacityProps } from "react-native";

const WEEK_DAYS = 7;
const SCREEN_MARGIN = (32 * 2) / 5
export const DAY_MARGIN_BETWEEN = 8
export const HABIT_DAY_SIZE = (Dimensions.get("screen").width / WEEK_DAYS) - (SCREEN_MARGIN + 5)

type HabitDayProps = TouchableOpacityProps & {
    isFake?: boolean;
}

export function HabitDay({isFake, ...rest}: HabitDayProps) {
    if(isFake) return (
        <View
            className="bg-zinc-900 rounded-lg border m-1 border-zinc-800 opacity-50"
            style={{width: HABIT_DAY_SIZE, height: HABIT_DAY_SIZE}}
         />
    )

    return (
        <TouchableOpacity
            activeOpacity={0.7}
            className="bg-zinc-900 rounded-lg border-2 m-1 border-zinc-800"
            style={{width: HABIT_DAY_SIZE, height: HABIT_DAY_SIZE}}
            {...rest}
         />
    )
}