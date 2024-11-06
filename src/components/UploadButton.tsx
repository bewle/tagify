"use client";

import { ArrowUpFromLine } from "lucide-react";
import { Button } from "./ui/button";
import { useRef } from "react";

export default function UploadButton() {
    const inputRef = useRef<HTMLInputElement>(null);

    function handleUpload() {
        console.log(inputRef.current?.files);
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
            />
        </>
    );
}
