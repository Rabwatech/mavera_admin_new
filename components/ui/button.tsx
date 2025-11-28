"use client";
import * as React from "react";
import { cn } from "../../lib/utils";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    const base =
      "inline-flex items-center justify-center font-bold rounded-xl transition-colors focus:outline-none disabled:opacity-50 disabled:pointer-events-none";
    const variants = {
      primary: "bg-mavera-navy text-white hover:bg-mavera-navyLight",
      secondary: "bg-mavera-gold text-white hover:bg-mavera-goldHover",
      ghost: "bg-transparent text-mavera-navy hover:bg-gray-50",
    } as const;
    const sizes = {
      sm: "h-8 px-3 text-sm",
      md: "h-10 px-4 text-sm",
      lg: "h-12 px-6 text-base",
    } as const;
    return (
      <button
        ref={ref}
        className={cn(base, variants[variant], sizes[size], className)}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
