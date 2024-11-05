import Navbar from "@/components/Navbar";
import Providers from "@/components/Providers";
import { cn } from "@/lib/utils";
import "@/styles/globals.css";
import { type Metadata } from "next";
import { Public_Sans } from "next/font/google";

const publicSans = Public_Sans({
    subsets: ["latin"],
    variable: "--font-public-sans",
});

export const metadata: Metadata = {
    title: "tagify",
    description: "tagify",
    icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <html suppressHydrationWarning lang="en">
            <body
                className={cn(
                    "min-h-screen bg-background font-sans antialiased transition-colors",
                    publicSans.variable
                )}
            >
                <Navbar />
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}
