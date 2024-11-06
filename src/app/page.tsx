import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileTree } from "@/components/FileTree";
import UploadButton from "@/components/UploadButton";
import RemoveButton from "@/components/RemoveButton";

export default function Page() {
    return (
        <main className="container flex flex-1 h-full gap-4 ">
            <Card className="w-1/4 transition-colors">
                <CardHeader>
                    <CardTitle className="flex items-center justify-between ">
                        <p className="text-xl font-bold">loaded files</p>
                        <div className="flex gap-2">
                            <RemoveButton />
                            <UploadButton />
                        </div>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <FileTree />
                </CardContent>
            </Card>
            <Card className="flex-1 py-6 transition-colors">
                <CardContent>test</CardContent>
            </Card>
        </main>
    );
}
