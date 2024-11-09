import { create } from 'zustand'

interface SelectModeState {
    selectMode: boolean
    setSelectMode: (mode: boolean) => void
}

export const useSelectModeStore = create<SelectModeState>()((set) => ({
    selectMode: false,
    setSelectMode: (mode: boolean) => set(() => ({ selectMode: mode })),
}))
