import { create } from 'zustand'

interface IsChangedState {
    isChanged: boolean;
    setIsChanged: (isChanged: boolean) => void;
}

export const useIsChangedStore = create<IsChangedState>()((set) => ({
    isChanged: false,
    setIsChanged: (isChanged: boolean) => set(() => ({ isChanged })),
}))
