"use client";

import { ImagePlus, Maximize2, CircleX } from "lucide-react";
import { Button } from "../ui/button";

export default function CoverPreview() {
    return (
        <div className="absolute inset-0 flex items-center justify-center gap-2 transition-all rounded-sm opacity-0 size-64 group-hover:opacity-100">
            <Button size="icon" variant="outline">
                <ImagePlus size={16} />
            </Button>
            <Button size="icon" variant="outline">
                <Maximize2 size={16} />
            </Button>
            <Button size="icon" variant="outline">
                <CircleX size={16} />
            </Button>
        </div>
    );
}
