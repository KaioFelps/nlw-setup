import { useEffect } from "react"
import { View } from "react-native"
import Animated, { useAnimatedStyle, useSharedValue, withTiming, withDelay } from "react-native-reanimated"

type ProgressBarProps = {
    progress?: number
}

export function ProgressBar({progress = 0}:ProgressBarProps ) {
    const sharedProgress = useSharedValue(progress)
    const style = useAnimatedStyle(() => {
        return {
            width: `${sharedProgress.value}%`,
        }
    })

    useEffect(() => {
        sharedProgress.value = withDelay(400, withTiming(progress))
    }, [progress])

    return (
        <View className="w-full h-3 rounded-full bg-zinc-700 mt-4">
            <Animated.View
                className="h-3 rounded-full bg-violet-600"
                style={style}
            />
        </View>
    )
}