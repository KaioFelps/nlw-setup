import { TouchableNativeFeedback, View } from "react-native";
import colors from "tailwindcss/colors"
import { Feather } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"

export function BackButton() {
    const { goBack } = useNavigation()

    return (
        <TouchableNativeFeedback onPress={goBack}>
            <View className="p-2 bg-zinc-500/10 w-min self-start rounded-full">
                <Feather
                    name="arrow-left"
                    size={32}
                    color={colors.zinc[400]}
                />
            </View>
        </TouchableNativeFeedback>
    )
}