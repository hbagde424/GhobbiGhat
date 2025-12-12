import * as React from "react";
import { cn } from "@/lib/utils";

export interface PremiumButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "premium" | "glass" | "gradient-border";
    size?: "sm" | "md" | "lg";
}

const PremiumButton = React.forwardRef<HTMLButtonElement, PremiumButtonProps>(
    ({ className, variant = "premium", size = "md", children, ...props }, ref) => {
        const variants = {
            premium: "btn-premium",
            glass: "btn-glass",
            "gradient-border": "btn-glass gradient-border",
        };

        const sizes = {
            sm: "px-4 py-2 text-xs",
            md: "px-6 py-3 text-sm",
            lg: "px-8 py-4 text-base",
        };

        return (
            <button
                ref={ref}
                className={cn(
                    variants[variant],
                    sizes[size],
                    "disabled:opacity-50 disabled:cursor-not-allowed",
                    className
                )}
                {...props}
            >
                {children}
            </button>
        );
    }
);

PremiumButton.displayName = "PremiumButton";

export { PremiumButton };
