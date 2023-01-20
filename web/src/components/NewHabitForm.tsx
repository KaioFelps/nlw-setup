import { Check } from "phosphor-react";

export function NewHabitForm() {
    return (
        <form
            className="w-full flex flex-col mt-6"
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
                autoFocus
                className="
                    p-4 rounded-lg mt-3 bg-zinc-800 text-white placeholder:text-zinc-400
                    focus:outline focus:outline-4 focus:outline-violet-500/50
                "
            />

            <label
                htmlFor=""
                className="font-semibold leading-tight mt-4"
            >
                Qual a recorrência?
            </label>

            <button
                type="submit"
                className="
                    mt-6 rounded-lg p-4 flex items-center justify-center gap-3 font-semibold bg-green-600
                    hover:bg-green-500
                    active:bg-green-700
                    focus:outline focus:outline-4 focus:outline-green-500/30
                "
            >
                <Check size={20} weight="bold" />
                Confirmar
            </button>
        </form>
    )
}