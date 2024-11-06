import { ArrowUp } from "lucide-react";

export default function GetStartedText() {
    return (
        <div className="flex items-center justify-between gap-2 pr-3">
            <p>no files? click there to get started!</p>
            <ArrowUp className="w-4 h-4" />
        </div>
    );
}
