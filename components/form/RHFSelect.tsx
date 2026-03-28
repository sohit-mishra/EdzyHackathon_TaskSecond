"use client";

import ErrorMessage from "../common/ErrorMessage";

export default function RHFSelect({
  label,
  register,
  name,
  options,
  error,
}: any) {
  return (
    <div>
      <label className="block text-sm mb-1">{label}</label>
      <select
        {...register(name)}
        className="w-full border p-2 rounded"
      >
        <option value="">Select</option>
        {options.map((opt: string) => (
          <option key={opt}>{opt}</option>
        ))}
      </select>
      <ErrorMessage message={error?.message} />
    </div>
  );
}