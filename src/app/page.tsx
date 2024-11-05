import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Page() {
    return (
        <main className="container flex gap-4 py-4">
            <Card className="w-1/3 transition-colors">
                <CardHeader>
                    <CardTitle>test</CardTitle>
                </CardHeader>
                <CardContent>test</CardContent>
            </Card>
            <Card className="flex-1 transition-colors">
                <CardHeader>
                    <CardTitle>test</CardTitle>
                </CardHeader>
                <CardContent>test</CardContent>
            </Card>
        </main>
    );
}
