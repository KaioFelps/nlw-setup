import { useState } from "react";
import { ScrollView, View, Text, TextInput, TouchableNativeFeedback, Alert } from "react-native";
import colors from "tailwindcss/colors";
import { BackButton } from "../components/BackButton";
import { Checkbox } from "../components/Checkbox";
import { Feather } from "@expo/vector-icons"
import { api } from "../lib/axios";
import { clsx } from "clsx"

export function New() {
    const [selectedWeekDays, setSelectedWeekDays] = useState<number[]>([])
    const [title, setTitle] = useState("")
    const [isSending, setIsSending] = useState(false)
    const weekDays = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"]

    function handleToggleWeekDay(weekDayIndex: number) {
        if(selectedWeekDays.includes(weekDayIndex)) {
            setSelectedWeekDays(prevState => prevState.filter(weekday => weekday !== weekDayIndex))
        }
        else {
            setSelectedWeekDays(prevState => [...prevState, weekDayIndex])
        }
    }

    async function handleCreateNewHabit() {
        try {
            setIsSending(true)
            if(!title.trim() || selectedWeekDays.length === 0) {
                Alert.alert("Calma aí! ✋🙅‍♂️", "Não é possível registrar um hábito sem título ou sem recorrência.")
                setIsSending(false)
                return;
            }

            await api.post("habits", {
                title,
                weekDays: selectedWeekDays,
            })
            
            setTitle("")
            setSelectedWeekDays([])

            Alert.alert("Eba 🎉", "Hábito criado com sucesso!")
        }
        catch (error) {
            console.log(error)
            Alert.alert("Ops, algo deu errado =(", `${error}`)
        }
        finally {
            setIsSending(false)
        }
    }

    return (
        <View className="flex-1 bg-background px-8 pt-16">
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom: 64}}>
                <BackButton />

                <Text className="mt-6 text-white font-extrabold text-3xl">
                    Criar Hábito
                </Text>

                <Text className="mt-6 text-white font-semibold text-base">
                    Qual seu comprometimento?
                </Text>

                <TextInput
                    className="h-12 pl-4 rounded-lg mt-3 bg-zinc-900 text-white
                            border-2 border-zinc-800 focus:border-violet-500 placeholder:text-zinc-300"
                    selectionColor={colors.violet[500]}
                    placeholder="Ex: exercícios, dormir bem, etc"
                    placeholderTextColor={colors.zinc[400]}
                    onChangeText={setTitle}
                    value={title}
                />

                <Text className="font-semibold text-white mt-4 mb-3 text-base">
                    Qual a recorrência?
                </Text>

                {weekDays.map((day, index) => {
                    return (
                        <Checkbox
                            key={index}
                            onPress={() => handleToggleWeekDay(index)}
                            isChecked={selectedWeekDays.includes(index)}
                        >
                            {day}
                        </Checkbox>
                    )
                })}

                <TouchableNativeFeedback onPress={handleCreateNewHabit} disabled={isSending} className="group">
                    <View
                        className={clsx("w-full h-14 flex flex-row items-center justify-center bg-green-500 rounded-md mt-6", {
                            "bg-zinc-700": isSending,
                        })}
                    >
                        <Feather
                            name="check"
                            size={20}
                            color={colors.white}
                        />
                        <Text className="font-semibold text-base text-white ml-2">Confirmar</Text>
                    </View>
                </TouchableNativeFeedback>
            </ScrollView>
        </View>
    )
}