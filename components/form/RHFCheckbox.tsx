"use client";

import ErrorMessage from "../common/ErrorMessage";

interface RHFCheckboxProps {
  label: string;
  register: any;
  name: string;
  error?: any;
  disabled?: boolean;
}

export default function RHFCheckbox({
  label,
  register,
  name,
  error,
  disabled = false,
}: RHFCheckboxProps) {
  return (
    <div>
      <label className="flex items-center gap-3 cursor-pointer">
        <input
          type="checkbox"
          {...register(name)}
          disabled={disabled}
          className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        />
        <span className={`text-gray-700 ${disabled ? "opacity-50" : ""}`}>
          {label}
        </span>
      </label>
      {error && <ErrorMessage message={error?.message} />}
    </div>
  );
}