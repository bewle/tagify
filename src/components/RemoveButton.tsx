"use client";
import { Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import { useFilesStore } from "@/lib/store/files";
import { AnimatePresence } from "framer-motion";

export default function UploadButton() {
    const { files, setFiles, selectedFiles, setSelectedFiles } =
        useFilesStore();

    if (selectedFiles.length === 0) return null;

    return (
        <AnimatePresence>
            <Button
                onClick={() => {
                    selectedFiles.forEach((file) => {
                        const e = files.filter((f) => f.id !== file);
                        setFiles(e);
                    });
                    setSelectedFiles([]);
                }}
                size="icon"
                variant="destructive"
            >
                <Trash2 />
            </Button>
        </AnimatePresence>
    );
}
