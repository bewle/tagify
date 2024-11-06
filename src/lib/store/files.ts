import { create } from 'zustand'

type File = { id: string; name: string };

interface FilesState {
    files: File[]
    addFile: (file: string) => void
    setFiles: (files: File[]) => void
    selectedFile: string
    setSelectedFile: (file: string) => void
    selectedFiles: string[]
    setSelectedFiles: (files: string[]) => void
}

export const useFilesStore = create<FilesState>()((set) => ({
    files: [],
    addFile: (file: string) => set((state) => ({ files: [...state.files, { id: crypto.randomUUID(), name: file }] })),
    setFiles: (files: File[]) => set(() => ({ files })),
    selectedFile: "",
    setSelectedFile: (file) => set(() => ({ selectedFile: file })),
    selectedFiles: [],
    setSelectedFiles: (files) => set(() => ({ selectedFiles: files })),
}))
