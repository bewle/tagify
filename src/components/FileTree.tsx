"use client";

import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { useFilesStore } from "@/lib/store/files";

export function FileTree() {
    const { files, selectedFile, setSelectedFile } = useFilesStore();

    return (
        <div className="flex flex-col gap-2">
            {files.map((file) => (
                <div
                    className="flex items-center gap-2 pl-2 rounded-md"
                    key={file.id}
                    style={{
                        backgroundColor:
                            selectedFile === file.id
                                ? "hsl(var(--muted))"
                                : "inherit",
                    }}
                >
                    <Checkbox className="bg-background" />
                    <Button
                        onClick={() => {
                            setSelectedFile(file.id);
                            console.log("selected file:", selectedFile);
                            console.log("file id:", file.id);
                        }}
                        variant="link"
                        className="justify-start max-w-full p-0 pr-6 font-mono text-[13px] tracking-tight"
                    >
                        <span className="truncate">{file.name}</span>
                    </Button>
                </div>
            ))}
        </div>
    );
}
