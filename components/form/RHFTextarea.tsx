"use client";

import ErrorMessage from "../common/ErrorMessage";

export default function RHFTextarea({
  label,
  register,
  name,
  error,
}: any) {
  return (
    <div>
      <label className="block text-sm mb-1">{label}</label>
      <textarea
        {...register(name)}
        className="w-full border p-2 rounded"
      />
      <ErrorMessage message={error?.message} />
    </div>
  );
}