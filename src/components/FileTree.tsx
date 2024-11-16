"use client";

import { useSelectModeStore } from "@/lib/store/select-mode";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { useFilesStore } from "@/lib/store/files";
import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuTrigger,
} from "./ui/context-menu";
import ConfirmationDialog from "./file-tree/ConfirmationDialog";
import { useState } from "react";
import { useIsChangedStore } from "@/lib/store/is-changed";

export function FileTree() {
    const {
        files,
        setFiles,
        selectedFile,
        setSelectedFile,
        selectedFiles,
        setSelectedFiles,
    } = useFilesStore();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const { selectMode } = useSelectModeStore();
    const { isChanged } = useIsChangedStore();

    return (
        <div className="flex flex-col">
            {files.map((file) => {
                return (
                    <div
                        className="flex items-center gap-2 pl-2 transition-colors rounded-md"
                        key={file.id}
                        style={{
                            backgroundColor:
                                selectedFile === file.id
                                    ? "hsl(var(--muted))"
                                    : "inherit",
                        }}
                    >
                        {selectMode && (
                            <Checkbox
                                className="transition-colors bg-background"
                                checked={selectedFiles.includes(file.id)}
                                onCheckedChange={(checked) => {
                                    setSelectedFiles(
                                        checked
                                            ? [...selectedFiles, file.id]
                                            : selectedFiles.filter(
                                                  (id) => id !== file.id
                                              )
                                    );
                                }}
                            />
                        )}
                        <ContextMenu>
                            <ContextMenuTrigger asChild>
                                <Button
                                    onClick={() => {
                                        if (isChanged) {
                                            setIsDialogOpen(true);
                                        } else {
                                            setSelectedFile(file.id);
                                        }
                                    }}
                                    variant="link"
                                    className="justify-start max-w-full p-0 pr-6 text-[13px] tracking-wide"
                                >
                                    <p title={file.name} className="truncate">
                                        {file.name}
                                    </p>
                                </Button>
                            </ContextMenuTrigger>
                            <ContextMenuContent>
                                <ContextMenuItem>
                                    <span>select</span>
                                </ContextMenuItem>
                                <ContextMenuItem
                                    onClick={() => {
                                        if (selectedFile === file.id) {
                                            setSelectedFile("");
                                        }
                                        setFiles(
                                            files.filter(
                                                (f) => f.id !== file.id
                                            )
                                        );
                                    }}
                                >
                                    <span className="text-destructive">
                                        delete
                                    </span>
                                </ContextMenuItem>
                            </ContextMenuContent>
                        </ContextMenu>
                    </div>
                );
            })}
            <ConfirmationDialog
                isOpen={isDialogOpen}
                setIsOpen={setIsDialogOpen}
            />
        </div>
    );
}
