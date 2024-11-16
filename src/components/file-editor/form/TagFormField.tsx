import {
    FormField,
    FormItem,
    FormLabel,
    FormControl,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import TagHoverCard from "./TagHoverCard";
import { type UseFormReturn } from "react-hook-form";
import { type FieldValues } from "react-hook-form";

export default function TagFormField({
    form,
    name,
    label,
    hoverCardText,
}: {
    form: UseFormReturn<FieldValues>;
    name: string;
    label: string;
    hoverCardText: string;
}) {
    return (
        <FormField
            control={form.control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <FormLabel className="flex items-center gap-1">
                        <p>{label}</p>
                        <TagHoverCard text={hoverCardText} />
                    </FormLabel>
                    <FormControl>
                        <Input {...field} />
                    </FormControl>
                </FormItem>
            )}
        />
    );
}
