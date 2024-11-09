"use client";

import { useSelectModeStore } from "@/lib/store/select-mode";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { useFilesStore } from "@/lib/store/files";

export function FileTree() {
    const {
        files,
        selectedFile,
        setSelectedFile,
        selectedFiles,
        setSelectedFiles,
    } = useFilesStore();

    const { selectMode } = useSelectModeStore();

    return (
        <div className="flex flex-col">
            {files.map((file) => (
                <div
                    className="flex items-center gap-2 pl-2 transition-colors rounded-md"
                    key={file.id}
                    style={{
                        backgroundColor:
                            selectedFile === file.id
                                ? "hsl(var(--muted))"
                                : "inherit",
                    }}
                >
                    {selectMode && (
                        <Checkbox
                            className="transition-colors bg-background"
                            checked={selectedFiles.includes(file.id)}
                            onCheckedChange={(checked) => {
                                setSelectedFiles(
                                    checked
                                        ? [...selectedFiles, file.id]
                                        : selectedFiles.filter(
                                              (id) => id !== file.id
                                          )
                                );
                            }}
                        />
                    )}
                    <Button
                        onClick={() => {
                            setSelectedFile(file.id);
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
