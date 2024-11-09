"use client";

import { useFilesStore } from "@/lib/store/files";
import { useState, useEffect } from "react";

export default function DropHandler() {
    const [isDragging, setIsDragging] = useState(false);
    const { addFile } = useFilesStore();

    useEffect(() => {
        const handleDragOver = (e: DragEvent) => {
            e.preventDefault();
            e.stopPropagation();
            if (!isDragging) setIsDragging(true);
        };

        const handleDragLeave = (e: DragEvent) => {
            e.preventDefault();
            e.stopPropagation();

            if (
                e.clientY <= 0 ||
                e.clientX <= 0 ||
                e.clientX >= window.innerWidth ||
                e.clientY >= window.innerHeight
            ) {
                setIsDragging(false);
            }
        };

        const handleDrop = (e: DragEvent) => {
            e.preventDefault();
            e.stopPropagation();
            setIsDragging(false);

            if (e.dataTransfer?.files) {
                const items = Array.from(e.dataTransfer.files);
                items.forEach((file) => {
                    addFile(file.name);
                });
            }
        };

        window.addEventListener("dragover", handleDragOver);
        window.addEventListener("dragleave", handleDragLeave);
        window.addEventListener("drop", handleDrop);

        return () => {
            window.removeEventListener("dragover", handleDragOver);
            window.removeEventListener("dragleave", handleDragLeave);
            window.removeEventListener("drop", handleDrop);
        };
    }, [isDragging, addFile]);

    if (!isDragging) return null;

    return (
        <div
            className="fixed inset-0 z-[9999] transition-all bg-black/50 flex items-center justify-center"
            style={{ pointerEvents: "none" }}
        >
            <div className="p-8 text-center rounded-lg shadow-lg bg-background">
                <p className="text-xl font-bold">drop files here</p>
                <p className="text-muted-foreground">release to add files</p>
            </div>
        </div>
    );
}
