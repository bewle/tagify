import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
    return (
        <nav className="h-20">
            <div className="container flex items-center justify-between h-full">
                <p className="text-2xl font-bold">tagify</p>
                <div className="flex gap-2">
                    <ThemeToggle variant="outline" />
                </div>
            </div>
        </nav>
    );
}
