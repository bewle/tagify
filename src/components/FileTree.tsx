import { Checkbox } from "./ui/checkbox";

export function FileTree() {
    return (
        <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
                <Checkbox />
                <p className="font-mono text-sm tracking-tight">test</p>
            </div>
        </div>
    );
}
