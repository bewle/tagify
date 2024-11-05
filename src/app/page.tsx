import ThemeToggle from "@/components/ThemeToggle";

export default function Page() {
    return (
        <div className="grid  place-items-center h-screen">
            <div className="flex w-[45vw]  justify-around motion-preset-fade">
                <div className="border-l-[1px] border-foreground/20 border-solid pl-6 prose prose-zinc dark:prose-invert transition-all self-start">
                    <h1>get started:</h1>
                    <ol>
                        <li>edit layout.tsx:</li>
                        <ul>
                            <li>change metadata</li>
                            <li>
                                change font if you want{" "}
                                <span className="font-bold text-xs">
                                    (remember to edit tailwind conf as well)
                                </span>
                            </li>
                        </ul>
                        <li>edit package.json:</li>
                        <ul>
                            <li>change name for git repo</li>
                        </ul>
                        <li>edit globals.css:</li>
                        <ul>
                            <li>make custom theme</li>
                        </ul>
                        <li>clear page.tsx & start coding!</li>
                    </ol>
                </div>
                <ThemeToggle className="self-center" variant="outline" />
            </div>
        </div>
    );
}
