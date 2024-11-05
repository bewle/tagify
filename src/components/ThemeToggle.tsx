"use client";
import { Moon, Sun } from "lucide-react";
import { Button } from "./ui/button";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { type ClassValue } from "clsx";
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
    const { theme, setTheme } = useTheme();

    return (
        <Button
            variant={variant}
            className={cn(className)}
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
            {theme === "dark" ? (
                <Moon className="transition-transform motion-preset-shrink" />
            ) : (
                <Sun className="transition-transform motion-preset-shrink" />
            )}
        </Button>
    );
}
