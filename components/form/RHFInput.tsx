"use client";

import ErrorMessage from "../common/ErrorMessage";

export default function RHFInput({
  label,
  register,
  name,
  error,
  ...props
}: any) {
  return (
    <div>
      <label className="block text-sm mb-1">{label}</label>
      <input
        {...register(name)}
        {...props}
        className="w-full border p-2 rounded"
      />
      <ErrorMessage message={error?.message} />
    </div>
  );
}