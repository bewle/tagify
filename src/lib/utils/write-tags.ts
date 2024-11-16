import { parseBlob } from "music-metadata";
import type { TagFormSchema } from "@/components/file-editor/FileEditorForm";

export async function writeTags(blob: Blob, tags: TagFormSchema) {
    if (blob) {
        console.log(parseBlob(blob));
    }
}