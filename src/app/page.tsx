import { FileTree } from "@/components/FileTree";
import FileEditor from "@/components/FileEditor";
import FileTreeButtons from "@/components/FileTreeButtons";

export default function Page() {
    return (
        <main className="flex flex-1 h-full 2xl:container">
            <div className="flex flex-col gap-4 p-6 transition-colors 2xl:w-1/4 xl:w-1/3 border-x border-border">
                <div className="flex items-center justify-between">
                    <FileTreeButtons />
                </div>
                <div className="max-h-[calc(100vh-10rem)] overflow-y-auto overflow-x-hidden">
                    <FileTree />
                </div>
            </div>
            <div className="relative flex-1 p-6 transition-colors border-r border-border">
                <FileEditor />
            </div>
        </main>
    );
}
