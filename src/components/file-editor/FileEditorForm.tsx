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
import { ImagePlus } from "lucide-react";
import CoverPreview from "./form/CoverPreview";
import TagHoverCard from "./form/TagHoverCard";

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
                            <div className="flex flex-col w-64 gap-4">
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
                                        <p>year</p>
                                        <TagHoverCard text="the year of the track" />
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={files.length === 0}
                                            placeholder={"2000"}
                                            {...field}
                                            value={
                                                tags?.common.year ?? undefined
                                            }
                                        />
                                    </FormControl>
                                </FormItem>
                                <div className="flex gap-4">
                                    <FormItem>
                                        <FormLabel className="flex items-center gap-1">
                                            <p>track number</p>
                                            <TagHoverCard text="the position of the track in the album" />
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                disabled={files.length === 0}
                                                placeholder={"1"}
                                                {...field}
                                                value={
                                                    tags?.common.track?.no ??
                                                    undefined
                                                }
                                            />
                                        </FormControl>
                                    </FormItem>
                                    <FormItem>
                                        <FormLabel className="flex items-center gap-1">
                                            <p>total tracks</p>
                                            <TagHoverCard text="the total number of tracks in the album" />
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                disabled={files.length === 0}
                                                placeholder={"12"}
                                                {...field}
                                                value={
                                                    tags?.common.totaltracks ??
                                                    undefined
                                                }
                                            />
                                        </FormControl>
                                    </FormItem>
                                </div>
                            </div>
                        </div>
                    )}
                />
            </form>
        </Form>
    );
}
