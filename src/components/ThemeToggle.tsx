"use client";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { type ClassValue } from "clsx";
import { Switch } from "./ui/switch";
export default function ThemeToggle({
    className,
    variant,
}: {
    className?: ClassValue;
    variant?:
        | "default"
        | "outline"
        | "ghost"
        | "link"
        | "secondary"
        | "destructive";
}) {
    const { theme, setTheme, resolvedTheme } = useTheme();

    return (
        <div className="flex items-center gap-2">
            <Sun size={20} />
            <Switch
                checked={theme === "dark"}
                onCheckedChange={() =>
                    setTheme(theme === "dark" ? "light" : "dark")
                }
            />
            <Moon size={20} />
        </div>

        // <Button
        //     variant={variant}
        //     className={cn(className)}
        //     size="icon"
        //     onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        // >
        //     {theme === "dark" ? (
        //         <Moon className="transition-transform motion-preset-shrink" />
        //     ) : (
        //         <Sun className="transition-transform motion-preset-shrink" />
        //     )}
        // </Button>
    );
}
