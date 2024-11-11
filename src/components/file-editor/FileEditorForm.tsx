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
import { ImagePlus, Info } from "lucide-react";
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "../ui/hover-card";
import CoverPreview from "./form/CoverPreview";

type FormSchema = {
    title?: string;
    artist?: string;
    album?: string;
    year?: string;
    genre?: string;
};

export default function FileEditorForm() {
    const { files, selectedFile } = useFilesStore();
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
        if (selectedFile && files.length > 0 && files[0]?.data) {
            const file = files.find((f) => f.id === selectedFile);
            const blob = new Blob([file?.data as BlobPart]);
            getTags(blob)
                .then((e) => {
                    setTags(e);
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }, [selectedFile, files]);

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
                                    <CoverPreview tags={tags} />
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
                                        <p>track number</p>
                                        <HoverCard openDelay={0} closeDelay={0}>
                                            <HoverCardTrigger>
                                                <Info size={16} />
                                            </HoverCardTrigger>
                                            <HoverCardContent side="top">
                                                <p>
                                                    the position of the track in
                                                    the album
                                                </p>
                                            </HoverCardContent>
                                        </HoverCard>
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={files.length === 0}
                                            placeholder={"1"}
                                            // {...field}
                                            value={
                                                tags?.common.track?.no ??
                                                undefined
                                            }
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
