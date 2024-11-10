"use client";

import { SquareMousePointer } from "lucide-react";
import { Button } from "../../ui/button";
import { useSelectModeStore } from "@/lib/store/select-mode";
import { useFilesStore } from "@/lib/store/files";

export default function ToggleSelectButton() {
    const { selectMode, setSelectMode } = useSelectModeStore();
    const { files } = useFilesStore();

    return (
        <Button
            size="icon"
            variant="outline"
            onClick={() => setSelectMode(!selectMode)}
            className={
                selectMode
                    ? "ring-2 ring-primary transition-all"
                    : "transition-all"
            }
            disabled={files.length === 0}
        >
            <SquareMousePointer />
        </Button>
    );
}
