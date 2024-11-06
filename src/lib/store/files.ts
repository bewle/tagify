import { create } from 'zustand'

interface FilesState {
    files: { id: string; name: string }[]
    addFile: (name: string) => void
    selectedFile: string
    setSelectedFile: (file: string) => void
    selectedFiles: string[]
    setSelectedFiles: (files: string[]) => void
}

export const useFilesStore = create<FilesState>()((set) => ({
    files: [],
    addFile: (file) => set((state) => ({ files: [...state.files, { id: crypto.randomUUID().toString(), name: file }] })),
    selectedFile: "",
    setSelectedFile: (file) => set(() => ({ selectedFile: file })),
    selectedFiles: [],
    setSelectedFiles: (files) => set(() => ({ selectedFiles: files })),
}))
