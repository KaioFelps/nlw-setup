import { Plus, X } from "phosphor-react";
import logoImage from "../assets/logo.svg"
import * as Dialog from "@radix-ui/react-dialog"
import { NewHabitForm } from "./NewHabitForm";

export function Header() {
    return (
        <header className="w-full max-w-3xl mx-auto flex items-center justify-between">
            <img src={logoImage} alt="Habits" />

            <Dialog.Root>
                <Dialog.Trigger
                    type="button"
                    className="
                    group py-4 px-6 flex flex-row gap-3 items-center rounded-lg border-solid border border-violet-500 text-white text-base
                    hover:border-violet-300 hover:bg-violet-500/20 transition-all
                    active:brightness-80
                    focus:border-transparent focus:outline-4 focus:outline-violet-500/50 focus:outline focus:delay-75 bg-violet-500/10"
                >
                <Plus size= {20} className="text-violet-500 group-hover:text-violet-300" /> Novo hábito
                </Dialog.Trigger>
                
                <Dialog.Portal>
                    <Dialog.Overlay
                        className="w-screen h-screen fixed inset-0 bg-black opacity-80"
                    />
                    <Dialog.Content className="fixed p-10 bg-zinc-900 rounded-2xl w-full max-w-md top-2/4 left-2/4 -translate-x-1/2 -translate-y-1/2">
                        <header className="flex flex-row items-center justify-between">
                            <Dialog.Title
                                className="text-3xl leading-tight font-extrabold"
                                >
                                Criar Hábito
                            </Dialog.Title>

                            <Dialog.Close
                                className="p-1 rounded-lg text-zinc-400 bg-zinc-900
                                hover:bg-zinc-800 hover:text-zinc-200
                                active:brightness-110
                                focus:outline focus:outline-4 focus:outline-violet-500/50"
                            >
                                <X size={24} aria-label="fechar diálogo" />
                            </Dialog.Close>
                        </header>

                        <NewHabitForm />
                    </Dialog.Content>
                </Dialog.Portal>
            </Dialog.Root>
            
        </header>
    )
}