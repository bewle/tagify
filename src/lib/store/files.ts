import { create } from 'zustand'

interface FilesState {
    files: string[]
    addFile: (file: string) => void
}

export const useFilesStore = create<FilesState>()((set) => ({
    files: [],
    addFile: (file) => set((state) => ({ files: [...state.files, file] })),
}))
