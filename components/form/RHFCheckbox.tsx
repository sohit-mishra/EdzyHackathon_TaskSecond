"use client";

export default function RHFCheckbox({
  label,
  register,
  name,
}: any) {
  return (
    <label className="flex items-center gap-2">
      <input type="checkbox" {...register(name)} />
      {label}
    </label>
  );
}