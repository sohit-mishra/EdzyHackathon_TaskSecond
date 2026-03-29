"use client";

import { useEffect, useState } from "react";
import { useDebounce } from "./useDebounce";

/**
 * Automatically persists form data to localStorage with debouncing
 * @param key - localStorage key
 * @param value - form data to persist
 * @param debounceMs - debounce delay in milliseconds (default: 2000)
 */
export function useFormPersist(key: string, value: any, debounceMs: number = 2000) {
  const debounced = useDebounce(value, debounceMs);

  useEffect(() => {
    if (!debounced) return;
    try {
      localStorage.setItem(key, JSON.stringify(debounced));
    } catch (error) {
      console.warn(`Failed to persist form data to localStorage:`, error);
    }
  }, [debounced, key]);
}

/**
 * Loads persisted form data from localStorage
 * @param key - localStorage key
 * @returns Parsed data or null if not found
 */
export function loadPersisted<T>(key: string): T | null {
  if (typeof window === "undefined") return null;
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.warn(`Failed to load persisted data from localStorage:`, error);
    return null;
  }
}

/**
 * Hook to load persisted form data with optional merge
 * @param key - localStorage key
 * @returns Persisted data or null
 */
export function useLoadPersisted<T>(key: string): T | null {
  const [data, setData] = useState<T | null>(null);

  useEffect(() => {
    const persisted = loadPersisted<T>(key);
    if (persisted) {
      setData(persisted);
    }
  }, [key]);

  return data;
}

/**
 * Clears persisted form data from localStorage
 * @param key - localStorage key
 */
export function clearPersisted(key: string): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.warn(`Failed to clear persisted data from localStorage:`, error);
  }
}