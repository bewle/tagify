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
import { ImagePlus, Maximize2 } from "lucide-react";
import CoverPreview from "./form/CoverPreview";
import TagHoverCard from "./form/TagHoverCard";
import { Button } from "../ui/button";

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
                            <div className="flex flex-col w-full gap-4 text-2xl font-bold">
                                {/* file name and format */}
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        {selectedFile && <p>*</p>}
                                        <p>
                                            {
                                                files.find(
                                                    (f) => f.id === selectedFile
                                                )?.name
                                            }
                                        </p>
                                    </div>
                                    <div className="flex gap-2">{}</div>
                                    <div className="flex gap-2">
                                        <Button disabled variant="destructive">
                                            discard
                                        </Button>
                                        <Button>save</Button>
                                    </div>
                                </div>
                                <div className="flex gap-4 *:flex-1">
                                    {/* artist */}
                                    <FormItem>
                                        <FormLabel className="flex items-center gap-1">
                                            <p>artist</p>
                                            <TagHoverCard text="the artist of the track" />
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                disabled={files.length === 0}
                                                placeholder={"Darude"}
                                                {...field}
                                                value={
                                                    tags?.common.artist ??
                                                    undefined
                                                }
                                            />
                                        </FormControl>
                                    </FormItem>

                                    {/* title */}
                                    <FormItem>
                                        <FormLabel className="flex items-center gap-1">
                                            <p>title</p>
                                            <TagHoverCard text="the title of the track" />
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                disabled={files.length === 0}
                                                placeholder={"Sandstorm"}
                                                {...field}
                                                value={
                                                    tags?.common.title ??
                                                    undefined
                                                }
                                            />
                                        </FormControl>
                                    </FormItem>
                                </div>
                                <div className="flex gap-4 *:flex-1">
                                    {/* album artist */}
                                    <FormItem>
                                        <FormLabel className="flex items-center gap-1">
                                            <p>album artist</p>
                                            <TagHoverCard text="the album of the track" />
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                disabled={files.length === 0}
                                                placeholder={"Darude"}
                                                {...field}
                                                value={
                                                    tags?.common.album ??
                                                    undefined
                                                }
                                            />
                                        </FormControl>
                                    </FormItem>

                                    {/* album */}
                                    <FormItem>
                                        <FormLabel className="flex items-center gap-1">
                                            <p>album</p>
                                            <TagHoverCard text="the album of the track" />
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                disabled={files.length === 0}
                                                placeholder={"Before the Storm"}
                                                {...field}
                                                value={
                                                    tags?.common.album ??
                                                    undefined
                                                }
                                            />
                                        </FormControl>
                                    </FormItem>
                                </div>
                            </div>
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

                                {/* year */}
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

                                {/* genre */}
                                <FormItem>
                                    <FormLabel className="flex items-center gap-1">
                                        <p>genre</p>
                                        <TagHoverCard text="the genre of the track" />
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={files.length === 0}
                                            placeholder={"Rock"}
                                            {...field}
                                            value={
                                                tags?.common.genre ?? undefined
                                            }
                                        />
                                    </FormControl>
                                </FormItem>

                                {/* track number */}
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

                                {/* disc number */}
                                <div className="flex gap-4">
                                    <FormItem>
                                        <FormLabel className="flex items-center gap-1">
                                            <p>disc number</p>
                                            <TagHoverCard text="the position of the disc" />
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                disabled={files.length === 0}
                                                placeholder={"1"}
                                                {...field}
                                                value={
                                                    tags?.common.disk?.no ??
                                                    undefined
                                                }
                                            />
                                        </FormControl>
                                    </FormItem>
                                    <FormItem>
                                        <FormLabel className="flex items-center gap-1">
                                            <p>total discs</p>
                                            <TagHoverCard text="the total number of discs" />
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                disabled={files.length === 0}
                                                placeholder={"12"}
                                                {...field}
                                                value={
                                                    tags?.common.totaldiscs ??
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
