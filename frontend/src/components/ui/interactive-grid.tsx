import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface GridItem {
    id: number;
    x: number;
    y: number;
    active: boolean;
}

export interface InteractiveGridProps {
    rows?: number;
    cols?: number;
    className?: string;
}

export const InteractiveGrid = ({ rows = 8, cols = 12, className }: InteractiveGridProps) => {
    const [gridItems, setGridItems] = useState<GridItem[]>([]);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const items: GridItem[] = [];
        for (let y = 0; y < rows; y++) {
            for (let x = 0; x < cols; x++) {
                items.push({
                    id: y * cols + x,
                    x,
                    y,
                    active: false,
                });
            }
        }
        setGridItems(items);
    }, [rows, cols]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * cols;
        const y = ((e.clientY - rect.top) / rect.height) * rows;
        setMousePos({ x, y });

        setGridItems((items) =>
            items.map((item) => {
                const distance = Math.sqrt(
                    Math.pow(item.x - x, 2) + Math.pow(item.y - y, 2)
                );
                return {
                    ...item,
                    active: distance < 2.5,
                };
            })
        );
    };

    const handleMouseLeave = () => {
        setGridItems((items) =>
            items.map((item) => ({
                ...item,
                active: false,
            }))
        );
    };

    return (
        <div
            className={cn("relative w-full h-full overflow-hidden", className)}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            <div
                className="grid gap-2 w-full h-full"
                style={{
                    gridTemplateColumns: `repeat(${cols}, 1fr)`,
                    gridTemplateRows: `repeat(${rows}, 1fr)`,
                }}
            >
                {gridItems.map((item) => (
                    <div
                        key={item.id}
                        className={cn(
                            "rounded-lg transition-all duration-300 ease-out",
                            "border border-white/5",
                            item.active
                                ? "bg-gradient-to-br from-primary/30 to-accent/30 border-primary/50 shadow-lg scale-110"
                                : "bg-white/5 hover:bg-white/10"
                        )}
                        style={{
                            transitionDelay: `${item.id * 2}ms`,
                        }}
                    />
                ))}
            </div>
        </div>
    );
};
