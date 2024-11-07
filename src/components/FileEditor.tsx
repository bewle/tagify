"use client";

import { useFilesStore } from "@/lib/store/files";

export default function FileEditor() {
    const { selectedFile } = useFilesStore();

    return <div>{selectedFile}</div>;
}
