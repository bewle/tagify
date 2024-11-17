import { useForm } from "react-hook-form";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { useFilesStore } from "@/lib/store/files";
import { getTags } from "@/lib/utils/get-tags";
import { useEffect, useState } from "react";
import { ImagePlus } from "lucide-react";
import CoverPreview from "./form/CoverPreview";
import TagHoverCard from "./form/TagHoverCard";
import { useIsChangedStore } from "@/lib/store/is-changed";
import { Textarea } from "../ui/textarea";
import { useQuery } from "@tanstack/react-query";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";
import { Label } from "../ui/label";
import TagFormField from "./form/TagFormField";

export type TagFormSchema = {
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
    const [originalTags, setOriginalTags] = useState<TagFormSchema>({});
    const { files, selectedFile } = useFilesStore();
    const { isChanged, setIsChanged } = useIsChangedStore();
    const form = useForm<TagFormSchema>({
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

    const file = files.find((f) => f.id === selectedFile);
    const query = useQuery({
        queryKey: ["tags", selectedFile],
        queryFn: async () => {
            if (!file?.data) return null;
            const blob = new Blob([file.data]);
            return getTags(blob);
        },
        enabled: !!file?.data,
    });

    useEffect(() => {
        if (query.data) {
            const tags = query.data;
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
    }, [files, form, query.data, selectedFile, setIsChanged]);

    function onSubmit(data: TagFormSchema) {
        console.log(data);
    }

    return (
        <>
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
                    className="h-full"
                >
                    <div className="flex justify-between gap-2 text-2xl font-bold">
                        <div className="flex items-start gap-2 max-w-[calc(40vw)]">
                            {isChanged && <span>*</span>}
                            <p title={file?.name} className="mb-6 truncate">
                                {file?.name}
                            </p>
                        </div>
                        <div className="flex gap-4">
                            <Button
                                disabled={!isChanged}
                                onClick={() => {
                                    form.reset(originalTags);
                                    setIsChanged(false);
                                }}
                                variant="destructive"
                            >
                                reset
                            </Button>
                            <Button
                                disabled={!isChanged}
                                onClick={form.handleSubmit(onSubmit)}
                            >
                                save
                            </Button>
                        </div>
                    </div>
                    {query.data && (
                        <div className="flex gap-4">
                            <div className="flex flex-col flex-1 gap-4">
                                <div className="flex gap-4 *:flex-1">
                                    <TagFormField
                                        form={form}
                                        name="artist"
                                        label="artist"
                                        hoverCardText="the artist of the track"
                                    />
                                    <TagFormField
                                        form={form}
                                        name="title"
                                        label="title"
                                        hoverCardText="the title of the track"
                                    />
                                </div>
                                <div className="flex gap-4 *:flex-1">
                                    <TagFormField
                                        form={form}
                                        name="albumArtist"
                                        label="album artist"
                                        hoverCardText="the album artist of the track"
                                    />
                                    <TagFormField
                                        form={form}
                                        name="album"
                                        label="album"
                                        hoverCardText="the album of the track"
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
                                                    className="transition-colors resize-none"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="flex flex-col w-64 gap-4">
                                {query.data?.common.picture?.[0]?.data ? (
                                    <CoverPreview tags={query.data} />
                                ) : (
                                    <div className="grid mb-4 rounded-sm size-64 bg-muted-foreground/50 place-items-center">
                                        <ImagePlus
                                            className="text-muted-foreground"
                                            size={32}
                                        />
                                    </div>
                                )}
                                <TagFormField
                                    form={form}
                                    name="year"
                                    label="year"
                                    hoverCardText="the year of the track"
                                />
                                <TagFormField
                                    form={form}
                                    name="genre"
                                    label="genre"
                                    hoverCardText="the genre of the track"
                                />
                                <div className="flex gap-4 *:flex-1">
                                    <TagFormField
                                        form={form}
                                        name="trackNumber"
                                        label="track number"
                                        hoverCardText="the track number of the track"
                                    />
                                    <TagFormField
                                        form={form}
                                        name="totalTracks"
                                        label="total tracks"
                                        hoverCardText="the total number of tracks in the album"
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                    {query.isLoading && (
                        <div className="flex gap-4">
                            <div className="flex flex-col flex-1 gap-4">
                                <div className="flex gap-4 *:flex-1">
                                    <div className="flex flex-col gap-2">
                                        <Label>artist</Label>
                                        <Skeleton className="w-full h-9" />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <Label>title</Label>
                                        <Skeleton className="w-full h-9" />
                                    </div>
                                </div>
                                <div className="flex gap-4 *:flex-1">
                                    <div className="flex flex-col gap-2">
                                        <Label>album artist</Label>
                                        <Skeleton className="w-full h-9" />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <Label>album</Label>
                                        <Skeleton className="w-full h-9" />
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <Label>comment</Label>
                                    <Skeleton className="w-full h-14" />
                                </div>
                            </div>
                            <div className="flex flex-col w-64 gap-4">
                                <Skeleton className="w-full h-64" />
                                <div className="flex flex-col gap-2">
                                    <Label>year</Label>
                                    <Skeleton className="w-full h-9" />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <Label>genre</Label>
                                    <Skeleton className="w-full h-9" />
                                </div>
                            </div>
                        </div>
                    )}
                </form>
            </Form>
        </>
    );
}
