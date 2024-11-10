import Image from "next/image";
import { useForm } from "react-hook-form";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFilesStore } from "@/lib/store/files";
import { getTags } from "@/lib/utils/get-tags";
import { useEffect, useState } from "react";
import type { IAudioMetadata } from "music-metadata";
import { Info } from "lucide-react";

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
                                    <Image
                                        src={URL.createObjectURL(
                                            new Blob([
                                                tags.common.picture[0].data,
                                            ])
                                        )}
                                        alt="cover"
                                        width={64}
                                        height={64}
                                        className="rounded-sm size-64"
                                    />
                                ) : null}
                                <FormItem>
                                    <FormLabel className="flex items-center gap-2">
                                        year <Info size={16} />
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={files.length === 0}
                                            placeholder={"Sandstorm"}
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
{
    /* <div className="flex w-full gap-6">
<div className="flex flex-col flex-1 w-full gap-2 ">
    <div className="flex gap-4 *:flex-1 h-fit w-full">
        <FormItem>
            <FormLabel>Title</FormLabel>
            <FormControl>
                <Input
                    disabled={
                        files.length === 0
                    }
                    placeholder={"Sandstorm"}
                    {...field}
                    value={tags?.common.title}
                />
            </FormControl>
            <FormDescription>
                the title of the track
            </FormDescription>
        </FormItem>
        <FormItem>
            <FormLabel>Artist</FormLabel>
            <FormControl>
                <Input
                    disabled={
                        files.length === 0
                    }
                    placeholder={"Sandstorm"}
                    {...field}
                    value={tags?.common.artist}
                />
            </FormControl>
            <FormDescription>
                the artist of the track
            </FormDescription>
        </FormItem>
    </div>
    <div className="flex gap-4 *:flex-1 h-fit w-full">
        <FormItem>
            <FormLabel>Album Title</FormLabel>
            <FormControl>
                <Input
                    disabled={
                        files.length === 0
                    }
                    placeholder={"Sandstorm"}
                    {...field}
                    value={tags?.common.album}
                />
            </FormControl>
            <FormDescription>
                the album title of the track
            </FormDescription>
        </FormItem>
        <FormItem>
            <FormLabel>Album Artist</FormLabel>
            <FormControl>
                <Input
                    disabled={
                        files.length === 0
                    }
                    placeholder={"Sandstorm"}
                    {...field}
                    value={
                        tags?.common.albumartist
                    }
                />
            </FormControl>
            <FormDescription>
                the album artist of the track
            </FormDescription>
        </FormItem>
    </div>
</div>
{tags?.common?.picture?.[0]?.data ? (
    <Image
        src={URL.createObjectURL(
            new Blob([
                tags.common.picture[0].data,
            ])
        )}
        alt="cover"
        width={64}
        height={64}
        className=" size-64"
    />
) : (
    <div className="grid border-2 border-dashed border-muted-foreground/50 size-64 place-items-center">
        no cover
    </div>
)}
</div> */
}
