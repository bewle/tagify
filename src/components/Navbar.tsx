import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
    return (
        <nav className="h-20 border-b-[1px] border-border shadow-sm transition-colors">
            <div className="container flex items-center justify-between h-full ">
                <p className="text-3xl font-bold">tagify</p>
                <div className="flex items-center gap-2">
                    <p>made with ❤️</p>
                    <p className="text-sm tracking-wider text-muted-foreground">
                        (
                        <Link
                            target="_blank"
                            href={`https://github.com/bewle/tagify`}
                        >
                            <span className="text-[10px] hover:underline">
                                {process.env.COMMIT_HASH}
                            </span>
                        </Link>
                        )
                    </p>
                </div>
                <div className="flex gap-2">
                    <ThemeToggle variant="outline" />
                </div>
            </div>
        </nav>
    );
}
