"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { EnrollmentData } from "@/types";

type Store = {
  data: EnrollmentData;

  setStepData: (
    step: keyof EnrollmentData,
    values: any
  ) => void;

  reset: () => void;
};

export const useEnrollmentStore = create<Store>()(
  persist(
    (set) => ({
      data: {
        step1: {},
        step2: {},
        step3: {},
      },

      setStepData: (step, values) =>
        set((state) => ({
          data: {
            ...state.data,
            [step]: values,
          },
        })),

      reset: () =>
        set({
          data: { step1: {}, step2: {}, step3: {} },
        }),
    }),
    {
      name: "enrollment-storage",
    }
  )
);