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
                    className="flex items-center gap-2"
                    key={file.id}
                    style={{
                        backgroundColor:
                            selectedFile === file.id
                                ? "hsl(var(--background))"
                                : "inherit",
                    }}
                >
                    <Checkbox />
                    <Button
                        onClick={() => {
                            setSelectedFile(file.id);
                            console.log(selectedFile);
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
