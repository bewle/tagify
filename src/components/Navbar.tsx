import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
    return (
        <nav className="h-20 border-b-[1px] border-border shadow-sm transition-colors">
            <div className="container flex items-center justify-between h-full ">
                <p className="text-3xl font-bold">tagify</p>
                <div className="flex items-center gap-2">
                    <p>made with ❤️</p>
                    <p className="text-sm tracking-wider text-muted-foreground">
                        v{process.env.VERSION} (
                        <span className="text-[10px]">
                            {process.env.COMMIT_HASH}
                        </span>
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
