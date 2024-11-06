import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { FileTree } from "@/components/FileTree";

export default function Page() {
    return (
        <main className="container flex gap-4 py-4">
            <Card className="w-1/4 transition-colors">
                <CardHeader>
                    <CardTitle className="flex items-center justify-between ">
                        <p className="text-xl font-bold">Loaded files</p>
                        <div className="flex gap-4">
                            <Button size="icon" variant="outline">
                                <Plus />
                            </Button>
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
