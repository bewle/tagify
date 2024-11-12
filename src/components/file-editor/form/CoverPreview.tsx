"use client";

import { ImagePlus, Maximize2, CircleX } from "lucide-react";
import { Button } from "../../ui/button";
import Image from "next/image";
import type { IAudioMetadata } from "music-metadata";
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
    DialogClose,
} from "@/components/ui/dialog";

export default function CoverPreview({ tags }: { tags: IAudioMetadata }) {
    if (!tags.common.picture?.[0]?.data) return null;
    return (
        <div className="relative p-0 mb-2 rounded-sm shadow size-64 bg-background/40 group">
            <Image
                src={URL.createObjectURL(
                    new Blob([tags.common.picture[0].data])
                )}
                alt="cover"
                width={64}
                height={64}
                className="transition-opacity duration-100 rounded-sm size-64 group-hover:opacity-50"
            />
            <div className="absolute inset-0 flex items-center justify-center gap-2 transition-all rounded-sm opacity-0 size-64 group-hover:opacity-100">
                <Button size="icon" variant="outline">
                    <ImagePlus size={16} />
                </Button>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button size="icon" variant="outline">
                            <Maximize2 size={16} />
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>track cover</DialogTitle>
                            <DialogDescription>
                                <Image
                                    src={URL.createObjectURL(
                                        new Blob([tags.common.picture[0].data])
                                    )}
                                    alt="cover"
                                    width={512}
                                    height={512}
                                />
                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter className="flex items-center justify-between w-full sm:justify-between">
                            <div className="flex gap-2">test</div>
                            <div className="flex gap-2">
                                <DialogClose asChild>
                                    <Button variant="outline">close</Button>
                                </DialogClose>
                                <Button>save</Button>
                            </div>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
                <Button size="icon" variant="outline">
                    <CircleX size={16} />
                </Button>
            </div>
        </div>
    );
}
