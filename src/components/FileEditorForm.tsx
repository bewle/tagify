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
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-2/3 space-y-6"
            >
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <>
                            <FormItem>
                                <FormLabel>Title</FormLabel>
                                <FormControl>
                                    <Input
                                        disabled={files.length === 0}
                                        placeholder={"Sandstorm"}
                                        {...field}
                                        value={tags?.common.title}
                                    />
                                </FormControl>
                                <FormDescription>
                                    the title of the audio file
                                </FormDescription>
                            </FormItem>
                            <FormItem>
                                <FormLabel>Artist</FormLabel>
                                <FormControl>
                                    <Input
                                        disabled={files.length === 0}
                                        placeholder={"Sandstorm"}
                                        {...field}
                                        value={tags?.common.artist}
                                    />
                                </FormControl>
                                <FormDescription>
                                    the artist of the audio file
                                </FormDescription>
                            </FormItem>
                        </>
                    )}
                />
            </form>
        </Form>
    );
}
