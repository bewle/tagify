"use client";
import { RefreshCcw, Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import { useFilesStore } from "@/lib/store/files";
import { AnimatePresence } from "framer-motion";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "./ui/dialog";

export default function UploadButton() {
    const { files, setFiles, selectedFiles, setSelectedFiles } =
        useFilesStore();

    if (files.length <= 1)
        return (
            <Dialog>
                <DialogTrigger>
                    <Button size="icon" variant="outline">
                        <RefreshCcw />
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Are you absolutely sure?</DialogTitle>
                        <DialogDescription>
                            This action cannot be undone. This will permanently
                            delete your account and remove your data from our
                            servers.
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        );

    return (
        <AnimatePresence>
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
        </AnimatePresence>
    );
}
