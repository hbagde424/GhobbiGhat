import * as React from "react";
import { cn } from "@/lib/utils";

export interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: "default" | "elevated" | "subtle";
    glow?: boolean;
    hover?: boolean;
}

const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
    ({ className, variant = "default", glow = false, hover = false, children, ...props }, ref) => {
        const variants = {
            default: "glass-card",
            elevated: "glass-card shadow-2xl",
            subtle: "glass-card opacity-80",
        };

        return (
            <div
                ref={ref}
                className={cn(
                    variants[variant],
                    glow && "glow",
                    hover && "hover-lift cursor-pointer",
                    className
                )}
                {...props}
            >
                {children}
            </div>
        );
    }
);

GlassCard.displayName = "GlassCard";

export { GlassCard };
