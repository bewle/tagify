"use client";
import { useFilesStore } from "@/lib/store/files";
import { ThemeProvider } from "next-themes";

export default function Providers({ children }: { children: React.ReactNode }) {
    const {
        selectedFiles,
        setSelectedFiles,
        addFile,
        setSelectedFile,
        files,
        selectedFile,
    } = useFilesStore();

    return (
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {children}
        </ThemeProvider>
    );
}
