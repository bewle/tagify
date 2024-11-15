import { useForm } from "react-hook-form";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFilesStore } from "@/lib/store/files";
import { getTags } from "@/lib/utils/get-tags";
import { useEffect, useState } from "react";
import type { IAudioMetadata } from "music-metadata";
import { ImagePlus } from "lucide-react";
import CoverPreview from "./form/CoverPreview";
import TagHoverCard from "./form/TagHoverCard";
import { useIsChangedStore } from "@/lib/store/is-changed";
import { Textarea } from "../ui/textarea";

type FormSchema = {
    artist?: string;
    title?: string;
    albumArtist?: string;
    album?: string;
    year?: string;
    genre?: string;
    trackNumber?: string;
    totalTracks?: string;
    discNumber?: string;
    totalDiscs?: string;
    comment?: string;
};

export default function FileEditorForm() {
    const [tags, setTags] = useState<IAudioMetadata | undefined>();
    const [originalTags, setOriginalTags] = useState<FormSchema>({
        title: "",
        artist: "",
        album: "",
        albumArtist: "",
        year: "",
        genre: "",
        trackNumber: "",
        totalTracks: "",
        discNumber: "",
        totalDiscs: "",
        comment: "",
    });
    const { files, selectedFile } = useFilesStore();
    const { isChanged, setIsChanged } = useIsChangedStore();
    const form = useForm<FormSchema>({
        defaultValues: {
            title: "",
            artist: "",
            album: "",
            albumArtist: "",
            year: "",
            genre: "",
            trackNumber: "",
            totalTracks: "",
            discNumber: "",
            totalDiscs: "",
            comment: "",
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
            form.setValue("title", tags?.common.title ?? "");
            form.setValue("artist", tags?.common.artist ?? "");
            form.setValue("album", tags?.common.album ?? "");
            form.setValue("year", tags?.common.year?.toString() ?? "");
            form.setValue("genre", tags?.common.genre?.[0] ?? "");
            form.setValue(
                "trackNumber",
                tags?.common.track?.no?.toString() ?? ""
            );
            form.setValue(
                "totalTracks",
                tags?.common.totaltracks?.toString() ?? ""
            );
            form.setValue(
                "discNumber",
                tags?.common.disk?.no?.toString() ?? ""
            );
            form.setValue(
                "totalDiscs",
                tags?.common.totaldiscs?.toString() ?? ""
            );
            form.setValue("comment", tags?.common.comment?.[0]?.text ?? "");
            setOriginalTags({
                title: tags?.common.title ?? "",
                artist: tags?.common.artist ?? "",
                album: tags?.common.album ?? "",
                albumArtist: tags?.common.albumartist ?? "",
                year: tags?.common.year?.toString() ?? "",
                genre: tags?.common.genre?.[0] ?? "",
                trackNumber: tags?.common.track?.no?.toString() ?? "",
                totalTracks: tags?.common.totaltracks?.toString() ?? "",
                discNumber: tags?.common.disk?.no?.toString() ?? "",
                totalDiscs: tags?.common.totaldiscs?.toString() ?? "",
            });

            setIsChanged(false);
        }
    }, [
        files,
        form,
        selectedFile,
        setIsChanged,
        tags?.common.album,
        tags?.common.albumartist,
        tags?.common.artist,
        tags?.common.comment,
        tags?.common.disk?.no,
        tags?.common.genre,
        tags?.common.title,
        tags?.common.totaldiscs,
        tags?.common.totaltracks,
        tags?.common.track?.no,
        tags?.common.year,
    ]);

    function onSubmit(data: FormSchema) {
        console.log(data);
    }

    return (
        <Form {...form}>
            <form
                onChange={() => {
                    if (
                        JSON.stringify(form.getValues()) !==
                        JSON.stringify(originalTags)
                    ) {
                        setIsChanged(true);
                    } else {
                        setIsChanged(false);
                    }
                }}
                onSubmit={form.handleSubmit(onSubmit)}
            >
                <div className="flex gap-4">
                    <div className="flex flex-col flex-1 gap-4">
                        <div className="flex max-w-[calc(40vw)] gap-2 text-2xl font-bold">
                            {isChanged && <span>*</span>}
                            <p className="truncate">
                                {files.find((f) => f.id === selectedFile)?.name}
                            </p>
                        </div>
                        <div className="flex gap-4 *:flex-1">
                            <FormField
                                control={form.control}
                                name="artist"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="flex items-center gap-1">
                                            <p>artist</p>
                                            <TagHoverCard text="the artist of the track" />
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                disabled={files.length === 0}
                                                {...field}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="flex items-center gap-1">
                                            <p>title</p>
                                            <TagHoverCard text="the title of the track" />
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                disabled={files.length === 0}
                                                {...field}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="flex gap-4 *:flex-1">
                            <FormField
                                control={form.control}
                                name="albumArtist"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="flex items-center gap-1">
                                            <p>album artist</p>
                                            <TagHoverCard text="the album artist of the track" />
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                disabled={files.length === 0}
                                                {...field}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="album"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="flex items-center gap-1">
                                            <p>album</p>
                                            <TagHoverCard text="the album of the track" />
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                disabled={files.length === 0}
                                                {...field}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </div>
                        <FormField
                            control={form.control}
                            name="comment"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="flex items-center gap-1">
                                        <p>comment</p>
                                        <TagHoverCard text="the album of the track" />
                                    </FormLabel>
                                    <FormControl>
                                        <Textarea
                                            className="resize-none"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
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
                        <FormField
                            control={form.control}
                            name="year"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="flex items-center gap-1">
                                        <p>year</p>
                                        <TagHoverCard text="the year of the track" />
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={files.length === 0}
                                            {...field}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="genre"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="flex items-center gap-1">
                                        <p>genre</p>
                                        <TagHoverCard text="the genre of the track" />
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={files.length === 0}
                                            {...field}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <div className="flex gap-4 *:flex-1">
                            <FormField
                                control={form.control}
                                name="trackNumber"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="flex items-center gap-1">
                                            <p>track number</p>
                                            <TagHoverCard text="the track number of the track" />
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                disabled={files.length === 0}
                                                {...field}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="totalTracks"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="flex items-center gap-1">
                                            <p>total tracks</p>
                                            <TagHoverCard text="the total number of tracks in the album" />
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                disabled={files.length === 0}
                                                {...field}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>
                </div>
            </form>
        </Form>
    );
}
