"use client";
import * as React from "react";
import { cn } from "../../lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          "w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-mavera-gold focus:ring-1 focus:ring-mavera-gold",
          className
        )}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";
