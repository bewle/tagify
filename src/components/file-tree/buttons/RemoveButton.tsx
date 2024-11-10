"use client";
import { RefreshCcw, Trash2 } from "lucide-react";
import { Button } from "../../ui/button";
import { useFilesStore } from "@/lib/store/files";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../../ui/dialog";
import { useSelectModeStore } from "@/lib/store/select-mode";

export default function RemoveButton() {
    const {
        files,
        setFiles,
        selectedFiles,
        setSelectedFiles,
        setSelectedFile,
    } = useFilesStore();
    const { selectMode, setSelectMode } = useSelectModeStore();

    function handleRemove() {
        setFiles(files.filter((f) => !selectedFiles.includes(f.id)));
        setSelectedFiles([]);
        setSelectMode(false);
    }

    return (
        <>
            {selectMode ? (
                <Button
                    onClick={handleRemove}
                    size="icon"
                    variant="destructive"
                    disabled={selectedFiles.length === 0}
                >
                    <Trash2 />
                </Button>
            ) : (
                <Dialog>
                    <DialogTrigger asChild>
                        <Button
                            size="icon"
                            variant="outline"
                            disabled={files.length === 0}
                        >
                            <RefreshCcw />
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>remove all files?</DialogTitle>
                            <DialogDescription>
                                this action cannot be undone.
                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button variant="outline">cancel</Button>
                            </DialogClose>
                            <DialogClose asChild>
                                <Button
                                    onClick={() => {
                                        setFiles([]);
                                        setSelectedFile("");
                                        setSelectedFiles([]);
                                    }}
                                    variant="destructive"
                                >
                                    remove
                                </Button>
                            </DialogClose>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            )}
        </>
    );
}
