import { write } from "node-id3";
import type NodeID3 from "node-id3";

export async function writeTags(blob: Blob, tags: NodeID3.Tags) {
    const arrayBuffer = await blob.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    write(tags, buffer);
}
