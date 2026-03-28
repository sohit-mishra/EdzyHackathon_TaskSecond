import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// helper: safe JSON parse
export function safeParse<T>(value: string | null): T | null {
  try {
    return value ? JSON.parse(value) : null;
  } catch {
    return null;
  }
}

// helper: delay (for submit simulation)
export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}