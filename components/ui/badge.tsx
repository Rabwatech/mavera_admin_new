import * as React from "react";
import { cn } from "../../lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "secondary" | "outline";
}

export function Badge({
  className,
  variant = "default",
  ...props
}: BadgeProps) {
  const variants = {
    default: "bg-mavera-gold text-white",
    secondary: "bg-gray-100 text-gray-600",
    outline: "border border-gray-200 text-gray-600",
  } as const;
  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-0.5 rounded text-xs font-bold",
        variants[variant],
        className
      )}
      {...props}
    />
  );
}
