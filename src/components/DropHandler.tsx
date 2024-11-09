"use client";

import { useState } from "react";
export default function DropHandler() {
    const [isDragging, setIsDragging] = useState(false);

    return (
        <div
            onDragOver={() => setIsDragging(true)}
            onDragLeave={() => setIsDragging(false)}
            onDrop={(e) => {
                e.preventDefault();
                setIsDragging(false);
            }}
            className="absolute top-0 left-0 z-50 w-full min-h-screen bg-black"
            style={{
                opacity: isDragging ? 1 : 0,
            }}
        ></div>
    );
}
