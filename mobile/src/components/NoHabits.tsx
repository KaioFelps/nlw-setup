import { Text } from "react-native"
import { useNavigation } from "@react-navigation/native"

export function NoHabits() {
    const { navigate } = useNavigation()

    return (
        <Text className="text-zinc-400 text-base">
            No momento você ainda não está monitorando nenhum hábito, comece <Text onPress={() => navigate("new habit")} className="text-violet-400 underline">cadastrando um</Text>.
        </Text>
    )
}