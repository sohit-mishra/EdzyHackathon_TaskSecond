"use client";

import { cn } from "@/lib/utils";
import ErrorMessage from "../common/ErrorMessage";

interface RHFMultiSelectProps {
  options: string[];
  value?: string[];
  onChange: (value: string[]) => void;
  label?: string;
  error?: any;
  required?: boolean;
  disabled?: boolean;
}

export default function RHFMultiSelect({
  options,
  value = [],
  onChange,
  label,
  error,
  required = false,
  disabled = false,
}: RHFMultiSelectProps) {
  const toggle = (item: string) => {
    if (value.includes(item)) {
      onChange(value.filter((i: string) => i !== item));
    } else {
      onChange([...value, item]);
    }
  };

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-3">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <div className="space-y-2 mb-3">
        {options.map((opt: string) => (
          <button
            key={opt}
            type="button"
            onClick={() => !disabled && toggle(opt)}
            disabled={disabled}
            className={cn(
              "flex w-full items-center gap-3 px-4 py-2 rounded-lg border transition-all text-left",
              value.includes(opt)
                ? "bg-blue-50 border-blue-500 text-blue-900"
                : "bg-white border-gray-300 text-gray-700 hover:border-gray-400",
              disabled && "opacity-50 cursor-not-allowed"
            )}
          >
            <input
              type="checkbox"
              checked={value.includes(opt)}
              onChange={() => {}}
              disabled={disabled}
              className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500 cursor-pointer"
            />
            <span>{opt}</span>
          </button>
        ))}
      </div>

      {/* Selected Chips */}
      {value.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-3">
          {value.map((item: string) => (
            <div
              key={item}
              className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
            >
              {item}
              {!disabled && (
                <button
                  type="button"
                  onClick={() => toggle(item)}
                  className="text-blue-600 hover:text-blue-800 font-semibold cursor-pointer"
                >
                  ×
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {error && <ErrorMessage message={error?.message} />}
    </div>
  );
}