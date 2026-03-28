"use client";

import { useEffect } from "react";

export function useScrollToError(errors: any) {
  useEffect(() => {
    const firstError = Object.keys(errors)[0];
    if (!firstError) return;

    const el = document.querySelector(
      `[name="${firstError}"]`
    ) as HTMLElement;

    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
      el.focus();
    }
  }, [errors]);
}