import { FileTree } from "@/components/FileTree";
import UploadButton from "@/components/UploadButton";
import RemoveButton from "@/components/RemoveButton";

export default function Page() {
    return (
        <main className="container flex flex-1 h-full ">
            <div className="flex flex-col w-1/4 gap-4 p-6 transition-colors border-x border-border">
                <div className="flex items-center justify-between ">
                    <p className="text-xl font-bold">loaded files</p>
                    <div className="flex gap-2">
                        <RemoveButton />
                        <UploadButton />
                    </div>
                </div>
                {/* <GetStartedText /> */}
                <div className="max-h-[calc(100vh-10rem)] overflow-y-auto overflow-x-hidden ">
                    <FileTree />
                </div>
            </div>
            <div className="flex-1 p-6 transition-colors border-r border-border">
                <div>test</div>
            </div>
        </main>
    );
}
