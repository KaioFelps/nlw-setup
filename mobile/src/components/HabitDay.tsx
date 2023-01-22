import clsx from "clsx";
import dayjs from "dayjs";
import { TouchableOpacity, Dimensions, View, TouchableOpacityProps } from "react-native";
import { generateProgressPercentage } from "../utils/generate-progress-percentage";

const WEEK_DAYS = 7;
const SCREEN_MARGIN = (32 * 2) / 5
export const DAY_MARGIN_BETWEEN = 8
export const HABIT_DAY_SIZE = (Dimensions.get("screen").width / WEEK_DAYS) - (SCREEN_MARGIN + 5)

type HabitDayProps = TouchableOpacityProps & {
    isFake?: boolean;
    date?: Date;
    completedHabitsLength?: number;
    availableHabitsLength?: number;
}

export function HabitDay({isFake, date, completedHabitsLength = 0, availableHabitsLength = 0, ...rest}: HabitDayProps) {
    if(isFake) return (
        <View
            className="bg-zinc-900 rounded-lg border m-1 border-zinc-800 opacity-50"
            style={{width: HABIT_DAY_SIZE, height: HABIT_DAY_SIZE}}
         />
    )

    const completedPercentage = completedHabitsLength === 0 ? 0 : generateProgressPercentage(availableHabitsLength, completedHabitsLength)
    const today = dayjs().startOf("day").toDate()
    const isCurrentDay = dayjs(date).isSame(today)

    return (
        <TouchableOpacity
            activeOpacity={0.7}
            style={{width: HABIT_DAY_SIZE, height: HABIT_DAY_SIZE}}
            className={clsx("rounded-lg border-2 m-1", {
                "bg-zinc-900 border-zinc-800": completedPercentage === 0,
                "bg-violet-900 border-violet-700": completedPercentage > 0 && completedPercentage < 20,
                "bg-violet-800 border-violet-600": completedPercentage >= 20 && completedPercentage < 40,
                "bg-violet-700 border-violet-500": completedPercentage >= 40 && completedPercentage < 60,
                "bg-violet-600 border-violet-500": completedPercentage >= 60 && completedPercentage < 80,
                "bg-violet-500 border-violet-300": completedPercentage >= 80,
                "border-white border-4": isCurrentDay,
            })}
            {...rest}
         />
    )
}