import { parseBlob } from "music-metadata";

export async function getTags(blob: Blob) {
    if (blob) {
        const tags = await parseBlob(blob);
        return tags;
    }
}