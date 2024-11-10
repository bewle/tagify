import Image from "next/image";
import { useForm } from "react-hook-form";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFilesStore } from "@/lib/store/files";
import { getTags } from "@/lib/utils/get-tags";
import { useEffect, useState } from "react";
import type { IAudioMetadata } from "music-metadata";
import { CircleX, ImagePlus, Info, Maximize2 } from "lucide-react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";
import { Button } from "./ui/button";

type FormSchema = {
    title?: string;
    artist?: string;
    album?: string;
    year?: string;
    genre?: string;
};

export default function FileEditorForm() {
    const { files } = useFilesStore();
    const [tags, setTags] = useState<IAudioMetadata | undefined>();
    const form = useForm<FormSchema>({
        defaultValues: {
            title: "",
            artist: "",
            album: "",
            year: "",
            genre: "",
        },
    });

    useEffect(() => {
        if (files.length > 0 && files[0]?.data) {
            const blob = new Blob([files[0].data]);
            getTags(blob)
                .then((e) => {
                    setTags(e);
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }, [files]);

    function onSubmit(data: FormSchema) {
        console.log(data);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <div className="grid grid-cols-[1fr_16rem] gap-4">
                            <div className="w-full">test</div>
                            <div className="flex flex-col w-64 gap-2">
                                {tags?.common.picture?.[0]?.data ? (
                                    <div className="relative p-0 rounded-sm shadow size-64 bg-background/40 group">
                                        <Image
                                            src={URL.createObjectURL(
                                                new Blob([
                                                    tags.common.picture[0].data,
                                                ])
                                            )}
                                            alt="cover"
                                            width={64}
                                            height={64}
                                            className="transition-opacity duration-100 rounded-sm size-64 group-hover:opacity-50"
                                        />
                                        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 transition-all rounded-sm opacity-0 size-64 group-hover:opacity-100">
                                            <Button
                                                size="icon"
                                                variant="outline"
                                            >
                                                <ImagePlus size={16} />
                                            </Button>
                                            <Button
                                                size="icon"
                                                variant="outline"
                                            >
                                                <Maximize2 size={16} />
                                            </Button>
                                            <Button
                                                size="icon"
                                                variant="outline"
                                            >
                                                <CircleX size={16} />
                                            </Button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="grid mb-4 rounded-sm size-64 bg-muted-foreground/50 place-items-center">
                                        <ImagePlus
                                            className="text-muted-foreground"
                                            size={32}
                                        />
                                    </div>
                                )}
                                <FormItem>
                                    <FormLabel className="flex items-center gap-1">
                                        <p>year</p>
                                        <HoverCard openDelay={0} closeDelay={0}>
                                            <HoverCardTrigger>
                                                <Info size={16} />
                                            </HoverCardTrigger>
                                            <HoverCardContent side="top">
                                                <p>the year of the track</p>
                                            </HoverCardContent>
                                        </HoverCard>
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={files.length === 0}
                                            placeholder={"2000"}
                                            {...field}
                                            value={tags?.common.year}
                                        />
                                    </FormControl>
                                </FormItem>
                            </div>
                        </div>
                    )}
                />
            </form>
        </Form>
    );
}
