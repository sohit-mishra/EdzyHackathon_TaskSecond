"use client";

import ErrorMessage from "../common/ErrorMessage";
import { cn } from "@/lib/utils";
import { InputHTMLAttributes } from "react";

interface RHFInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  register: any;
  name: string;
  error?: any;
  required?: boolean;
}

export default function RHFInput({
  label,
  register,
  name,
  error,
  required = false,
  className,
  ...props
}: RHFInputProps) {
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-2">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <input
        id={name}
        {...register(name)}
        {...props}
        className={cn(
          "w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all",
          error ? "border-red-500" : "border-gray-300",
          className
        )}
      />
      {error && <ErrorMessage message={error.message} />}
    </div>
  );
}