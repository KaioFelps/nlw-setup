import { View } from "react-native"

type ProgressBarProps = {
    progress?: number
}

export function ProgressBar({progress = 0}:ProgressBarProps ) {
    return (
        <View className="w-full h-3 rounded-full bg-zinc-700 mt-4">
            <View
                className="h-3 rounded-full bg-violet-600"
                style={{width: `${progress}%`}}
            />
        </View>
    )
}