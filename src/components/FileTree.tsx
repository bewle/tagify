"use client";

import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { useFilesStore } from "@/lib/store/files";

export function FileTree() {
    const { files } = useFilesStore();

    return (
        <div className="flex flex-col gap-2">
            {files.map((file) => (
                <div className="flex items-center gap-2" key={file}>
                    <Checkbox />
                    <Button
                        variant="link"
                        className="justify-start max-w-full p-0 pr-6 font-mono text-sm tracking-tight "
                    >
                        <span className="truncate ">{file}</span>
                    </Button>
                </div>
            ))}
        </div>
    );
}
