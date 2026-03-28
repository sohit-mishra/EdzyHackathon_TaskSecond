"use client";

import { useState } from "react";

export default function RHFMultiSelect({
  options,
  value = [],
  onChange,
}: any) {
  const toggle = (item: string) => {
    if (value.includes(item)) {
      onChange(value.filter((i: string) => i !== item));
    } else {
      onChange([...value, item]);
    }
  };

  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt: string) => (
        <button
          type="button"
          key={opt}
          onClick={() => toggle(opt)}
          className={`px-3 py-1 rounded border ${
            value.includes(opt)
              ? "bg-black text-white"
              : ""
          }`}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}