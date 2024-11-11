import {
    HoverCard,
    HoverCardTrigger,
    HoverCardContent,
} from "@/components/ui/hover-card";
import { Info } from "lucide-react";

export default function TagInfoHover({ text }: { text: string }) {
    return (
        <HoverCard openDelay={0} closeDelay={0}>
            <HoverCardTrigger>
                <Info size={16} />
            </HoverCardTrigger>
            <HoverCardContent side="top">
                <p>{text}</p>
            </HoverCardContent>
        </HoverCard>
    );
}
