import { create } from 'zustand'

type FileObject = { id: string; name: string; data: Blob };

interface FilesState {
    files: FileObject[]
    addFile: (file: FileObject) => void
    setFiles: (files: FileObject[]) => void
    selectedFile: string
    setSelectedFile: (file: string) => void
    selectedFiles: string[]
    setSelectedFiles: (files: string[]) => void
}

export const useFilesStore = create<FilesState>()((set) => ({
    files: [],
    addFile: (file: FileObject) => set((state) => ({ files: [...state.files, file] })),
    setFiles: (files: FileObject[]) => set(() => ({ files })),
    selectedFile: "",
    setSelectedFile: (file) => set(() => ({ selectedFile: file })),
    selectedFiles: [],
    setSelectedFiles: (files) => set(() => ({ selectedFiles: files })),
}))
