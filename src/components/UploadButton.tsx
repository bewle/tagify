"use client";

import { Toaster } from "@/components/ui/toaster";
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
                    title: "one or more files are already loaded",
                    description: "click for more info",
                });
            } else {
                const file = e.target.files?.[0]; // Get the first file

                if (file) {
                    addFile({
                        id: crypto.randomUUID(),
                        name: file.name,
                        data: new Blob([file]),
                    });
                }

                // if (file) {
                //     const reader = new FileReader();

                //     reader.onload = () => {
                //         const buffer = reader.result;
                //         console.log("File buffer:", buffer);
                //         addFile({
                //             id: crypto.randomUUID(),
                //             name: file.name,
                //             data: new Blob([buffer as BlobPart]),
                //         });
                //     };

                //     reader.readAsArrayBuffer(file);
                // }
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
            <Toaster />
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
