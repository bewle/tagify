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
    const { files, setFiles, selectedFiles, setSelectedFiles } =
        useFilesStore();

    if (files.length >= 1 && selectedFiles.length === 0)
        return (
            <Dialog>
                <DialogTrigger asChild>
                    <Button size="icon" variant="outline">
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

    if (selectedFiles.length >= 1)
        return (
            <Button
                onClick={() => {
                    const test = files.filter(
                        (f) => !selectedFiles.includes(f.id)
                    );
                    setFiles(test);
                    setSelectedFiles([]);
                }}
                size="icon"
                variant="destructive"
            >
                <Trash2 />
            </Button>
        );
}
