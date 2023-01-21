import { ScrollView, View, Text } from "react-native";
import { useRoute } from "@react-navigation/native"
import { BackButton } from "../components/BackButton";
import dayjs from "dayjs";
import { ProgressBar } from "../components/ProgressBar";
import { Checkbox } from "../components/Checkbox";

type Params = {
    date: string;
}

export function Habit() {
    const route = useRoute()
    const { date } = route.params as Params

    const parsedDate = dayjs(date);
    const weekDay = parsedDate.format("dddd");
    const dayAndMonth = parsedDate.format("DD/MM")

    return (
        <View
            className="flex-1 bg-background px-8 pt-16"
        >
            <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingBottom: 64}}
            >
                <BackButton />

                <Text className="mt-6 text-base font-semibold text-zinc-400">{weekDay}</Text>
                <Text className="mt-2 text-white font-extrabold text-3xl">{dayAndMonth}</Text>

                <ProgressBar progress={50} />

                <View className="mt-6">
                    <Checkbox isChecked>Beber tereré</Checkbox>
                    <Checkbox isChecked>Caminhar</Checkbox>
                    <Checkbox isChecked={false}>Dormir 8h</Checkbox>
                </View>
            </ScrollView>
        </View>
    )
}