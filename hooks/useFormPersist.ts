"use client";

import { useEffect } from "react";
import { useDebounce } from "./useDebounce";

export function useFormPersist(key: string, value: any) {
  const debounced = useDebounce(value, 2000);

  useEffect(() => {
    if (!debounced) return;
    localStorage.setItem(key, JSON.stringify(debounced));
  }, [debounced, key]);
}

export function loadPersisted(key: string) {
  if (typeof window === "undefined") return null;
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
}