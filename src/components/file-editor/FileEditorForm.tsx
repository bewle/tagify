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
import { useIsChangedStore } from "@/lib/store/is-changed";

type FormSchema = {
    title?: string;
    artist?: string;
    album?: string;
    year?: string;
    genre?: string;
    trackNumber?: string;
    totalTracks?: string;
    discNumber?: string;
    totalDiscs?: string;
};

export default function FileEditorForm() {
    const [tags, setTags] = useState<IAudioMetadata | undefined>();
    const [originalTags, setOriginalTags] = useState({
        title: "",
        artist: "",
        album: "",
        year: "",
        genre: "",
        trackNumber: "",
        totalTracks: "",
        discNumber: "",
        totalDiscs: "",
    });
    const { files, selectedFile } = useFilesStore();
    const { isChanged, setIsChanged } = useIsChangedStore();
    const form = useForm<FormSchema>({
        defaultValues: {
            title: "",
            artist: "",
            album: "",
            year: "",
            genre: "",
            trackNumber: "",
            totalTracks: "",
            discNumber: "",
            totalDiscs: "",
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

            setOriginalTags({
                title: tags?.common.title ?? "",
                artist: tags?.common.artist ?? "",
                album: tags?.common.album ?? "",
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
        tags?.common.artist,
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
                        <div className="flex gap-2 text-2xl font-bold">
                            {isChanged && <span>*</span>}
                            <p className="truncate">
                                {files.find((f) => f.id === selectedFile)?.name}
                            </p>
                        </div>
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
                                            placeholder={"Darude"}
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
                                        <p>artist</p>
                                        <TagHoverCard text="the artist of the track" />
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={files.length === 0}
                                            placeholder={"Darude"}
                                            {...field}
                                        />
                                    </FormControl>
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
                                            placeholder={"Darude"}
                                            {...field}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    </div>
                </div>
            </form>
        </Form>
    );
}
