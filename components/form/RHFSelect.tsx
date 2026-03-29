"use client";

import ErrorMessage from "../common/ErrorMessage";
import { cn } from "@/lib/utils";

interface RHFSelectProps {
  label?: string;
  register: any;
  name: string;
  options: string[];
  error?: any;
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
}

export default function RHFSelect({
  label,
  register,
  name,
  options,
  error,
  required = false,
  disabled = false,
  placeholder = "Select an option",
}: RHFSelectProps) {
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-2">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <select
        id={name}
        {...register(name)}
        disabled={disabled}
        className={cn(
          "w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all bg-white",
          error ? "border-red-500" : "border-gray-300",
          disabled && "bg-gray-100 cursor-not-allowed opacity-50"
        )}
      >
        <option value="">{placeholder}</option>
        {options.map((opt: string) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
      {error && <ErrorMessage message={error?.message} />}
    </div>
  );
}