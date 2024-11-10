"use client";

import { FileQuestion } from "lucide-react";
import FileEditorForm from "./file-editor/FileEditorForm";
import { Card } from "./ui/card";
import { useFilesStore } from "@/lib/store/files";

export default function FileEditor() {
    const { selectedFile } = useFilesStore();

    return (
        <>
            {!selectedFile ? (
                <>
                    <div className="absolute top-0 left-0 grid w-full h-full place-items-center">
                        {/* <div className="rounded-md bg-background size-64"></div> */}
                        <Card className="flex flex-col items-center justify-center gap-2 transition-colors rounded-lg shadow-lg size-64">
                            <FileQuestion size={56} />
                            <p className="text-xl font-semibold">
                                no file selected
                            </p>
                            <p className="text-sm text-muted-foreground max-w-[75%] text-center">
                                select a file by clicking it in the file tree.
                                you can load files by dragging or clicking on
                                the upload button
                            </p>
                        </Card>
                    </div>
                    <div className="opacity-30">
                        <FileEditorForm />
                    </div>
                </>
            ) : (
                <FileEditorForm />
            )}
        </>
    );
}
