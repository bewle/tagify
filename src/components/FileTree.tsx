import { Checkbox } from "./ui/checkbox";

const FILES = [
    {
        id: "1",
        name: "aerate - distort.mp3",
    },
    {
        id: "2",
        name: "aerate - test.mp3",
    },
];

export function FileTree() {
    return (
        <div className="flex flex-col gap-2">
            {FILES.map((e) => {
                return (
                    <div key={e.id} className="flex items-center gap-2">
                        <Checkbox />
                        <p className="font-mono text-sm tracking-tight">
                            {e.name}
                        </p>
                    </div>
                );
            })}
        </div>
    );
}
