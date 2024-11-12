"use client";

import { FileQuestion } from "lucide-react";
import FileEditorForm from "./file-editor/FileEditorForm";
import { Card } from "./ui/card";
import { useFilesStore } from "@/lib/store/files";

export default function FileEditor() {
    const { selectedFile } = useFilesStore();

    if (!selectedFile)
        return (
            <>
                <div className="absolute top-0 left-0 grid w-full h-full pointer-events-none place-items-center">
                    <Card className="flex flex-col items-center justify-center gap-2 transition-colors rounded-lg shadow-lg size-64">
                        <FileQuestion size={56} />
                        <p className="text-xl font-semibold">
                            no file selected
                        </p>
                        <p className="text-sm text-muted-foreground max-w-[75%] text-center">
                            select a file by clicking one in the file tree. you
                            can load files by dragging or clicking on the upload
                            button
                        </p>
                    </Card>
                </div>
                <div className="pointer-events-none opacity-30">
                    <FileEditorForm />
                </div>
            </>
        );
    return <FileEditorForm />;
}
