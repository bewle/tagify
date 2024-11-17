import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
    return (
        <nav className="h-20 border-b-[1px] border-border shadow-sm transition-colors">
            <div className="container flex items-center justify-between h-full ">
                <p className="text-3xl font-bold">tagify</p>
                <p className="text-sm tracking-wider text-muted-foreground">
                    {process.env.VERSION} made with ❤️
                </p>
                <div className="flex gap-2">
                    <ThemeToggle variant="outline" />
                </div>
            </div>
        </nav>
    );
}
