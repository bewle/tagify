"use client";
import { RefreshCcw, Trash2 } from "lucide-react";
import { Button } from "./ui/button";
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
} from "./ui/dialog";

export default function RemoveButton() {
    const {
        files,
        setFiles,
        selectedFiles,
        setSelectedFiles,
        setSelectedFile,
    } = useFilesStore();

    return (
        <Dialog>
            <DialogTrigger asChild>
                {selectedFiles.length === 0 ? (
                    <Button
                        size="icon"
                        variant="outline"
                        disabled={files.length === 0}
                    >
                        <RefreshCcw />
                    </Button>
                ) : (
                    <Button
                        onClick={() => {
                            const filteredFiles = files.filter(
                                (f) => !selectedFiles.includes(f.id)
                            );
                            setFiles(filteredFiles);
                            setSelectedFiles([]);
                        }}
                        size="icon"
                        variant="destructive"
                    >
                        <Trash2 />
                    </Button>
                )}
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
    );
}
