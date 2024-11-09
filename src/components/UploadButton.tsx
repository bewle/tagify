"use client";

import { ArrowUpFromLine } from "lucide-react";
import { Button } from "./ui/button";
import { useRef } from "react";
import { useFilesStore } from "@/lib/store/files";
import { useToast } from "@/hooks/use-toast";

export default function UploadButton() {
    const inputRef = useRef<HTMLInputElement>(null);
    const { toast } = useToast();
    const { addFile, files } = useFilesStore();

    function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
        Array.from(e.target.files ?? []).forEach((file) => {
            if (files.some((f) => f.name === file.name)) {
                console.log("a file already exists, attempting to show toast");
                toast({
                    title: "File already exists",
                    description: "Please choose a different file.",
                });
            } else {
                addFile(file.name);
            }
        });
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
                multiple
            />
        </>
    );
}
