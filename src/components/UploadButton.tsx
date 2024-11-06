"use client";

import { ArrowUpFromLine } from "lucide-react";
import { Button } from "./ui/button";
import { useRef } from "react";
import { useFilesStore } from "@/lib/store/files";

export default function UploadButton() {
    const inputRef = useRef<HTMLInputElement>(null);
    const { addFile } = useFilesStore();

    function handleUpload() {
        addFile(inputRef.current?.files?.[0]?.name ?? "");
    }

    return (
        <>
            <Button
                onClick={() => {
                    inputRef.current?.click();
                }}
                size="icon"
                variant="outline"
            >
                <ArrowUpFromLine />
            </Button>
            <input
                onChange={handleUpload}
                ref={inputRef}
                type="file"
                className="hidden"
                accept=".mp3, .wav, .ogg, .m4a, .flac, .aac"
            />
        </>
    );
}
