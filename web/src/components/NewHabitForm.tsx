import { Check } from "phosphor-react";
import { FormEvent, useState } from "react";
import * as Checkbox from "@radix-ui/react-checkbox"
import colors from "tailwindcss/colors";
import useRipple from "use-ripple-hook";
import { api } from "../lib/axios";

export function NewHabitForm() {
    const [ title, setTitle ] = useState("")
    const [ selectedWeekDays, setSelectedWeekDays ] = useState<number[]>([])
    const [ isSending, setIsSending ] = useState(false)

    const [ ripple, event ] = useRipple()

    const weekDays = [
        "Domingo",
        "Segunda-feira",
        "Terça-feira",
        "Quarta-feira",
        "Quinta-feira",
        "Sexta-feira",
        "Sábado"
    ]

    async function handleCreateNewHabit(e: FormEvent) {
        e.preventDefault()
        setIsSending(true)
        
        if(!title || weekDays.length === 0) {
            alert("Você não deve deixar de enviar o título nem de selecionar ao menos um dia da semana.")
            setIsSending(false)
            return;
        };

        try {            
            await api.post("habits", {
                title,
                weekDays: selectedWeekDays,
            })
    
            setTitle("")
            setSelectedWeekDays([])
            setIsSending(false)
            alert("Hábito criado com sucesso!")
        } catch (error) {
            console.log(error)
            setIsSending(false)
            alert("Algo deu errado na criação do hábito =(")
        }
    }

    function handleToggleSelectedWeekDay(index: number) {
        if(selectedWeekDays.includes(index)) {
            setSelectedWeekDays(prevState => prevState.filter(day => day !== index))
            return;
        }
        
        setSelectedWeekDays(prevState => [...prevState, index])
    }

    return (
        <form
            className="w-full flex flex-col mt-6"
            onSubmit={handleCreateNewHabit}
        >
            <label
                htmlFor="habitTitle"
                className="font-semibold leading-tight"
            >
                Qual seu comprometimento?
            </label>
            <input
                type="text"
                id="habitTitle"
                placeholder="Ex: exercícios, dormir bem, etc..."
                value={title}
                autoFocus
                className="
                    p-4 rounded-lg mt-3 border-2 border-zinc-800 bg-zinc-800/25 text-white placeholder:text-zinc-400
                    focus:outline focus:outline-4 focus:outline-violet-500/50 focus:border-transparent -focus:outline-offset-4 focus:transition-all focus:duration-75
                "
                onChange={(event) => setTitle(event.target.value)}
            />

            <label
                htmlFor=""
                className="font-semibold leading-tight mt-4"
            >
                Qual a recorrência?
            </label>

            <div className="mt-3 flex flex-col gap-3">
                {weekDays.map((day, index) => {
                    return (
                        <Checkbox.Root
                            key={day}
                            className="group flex flex-row items-center gap-3 focus:outline-0"
                            onCheckedChange={() => handleToggleSelectedWeekDay(index)}
                            checked={selectedWeekDays.includes(index)}
                        >
                            <div
                                className="
                                h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800
                                group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500
                                group-focus:outline-4 group-focus:outline-green-500/25 group-focus:outline
                                "
                            >
                                <Checkbox.Indicator>
                                    <Check size={20} weight="bold" color={colors.white} />
                                </Checkbox.Indicator>
                            </div>
                
                            <span className="
                                font-semibold text-xl text-white leading-tight">
                                {day}
                            </span>
                        </Checkbox.Root>
                    )
                })}
            </div>

            <button
                type="submit"
                className="
                    mt-6 rounded-lg p-4 flex items-center justify-center gap-3 font-semibold bg-green-600
                    hover:bg-green-700
                    focus:outline focus:outline-4 focus:outline-green-500/30
                    disabled:cursor-not-allowed disabled:saturate-0
                "
                ref={ripple}
                onMouseDown={event}
                disabled={isSending}
            >
                {
                    !isSending ?
                    <>
                    <Check size={20} weight="bold" />
                    Confirmar
                    </>
                    :
                    "Carregando"
                }
            </button>
        </form>
    )
}