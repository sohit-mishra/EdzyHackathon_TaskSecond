import type { EnrollmentData } from "@/types";
import { safeParse } from "@/lib/utils";

const KEY = "enrollment-manual";

export function saveToLocal(data: EnrollmentData) {
  localStorage.setItem(KEY, JSON.stringify(data));
}

export function loadFromLocal(): EnrollmentData | null {
  return safeParse<EnrollmentData>(localStorage.getItem(KEY));
}

export function clearLocal() {
  localStorage.removeItem(KEY);
}