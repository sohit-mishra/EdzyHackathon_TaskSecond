"use client";

import { createContext, useContext, useState } from "react";

type EnrollmentData = {
  step1: any;
  step2: any;
  step3: any;
};

type ContextType = {
  data: EnrollmentData;
  setStepData: (step: keyof EnrollmentData, values: any) => void;
  reset: () => void;
};

const EnrollmentContext = createContext<ContextType | null>(null);

export function EnrollmentProvider({ children }: any) {
  const [data, setData] = useState<EnrollmentData>({
    step1: {},
    step2: {},
    step3: {},
  });

  const setStepData = (step: keyof EnrollmentData, values: any) => {
    setData((prev) => ({
      ...prev,
      [step]: values,
    }));
  };

  const reset = () => {
    setData({ step1: {}, step2: {}, step3: {} });
  };

  return (
    <EnrollmentContext.Provider value={{ data, setStepData, reset }}>
      {children}
    </EnrollmentContext.Provider>
  );
}

export const useEnrollmentContext = () => {
  const ctx = useContext(EnrollmentContext);
  if (!ctx) throw new Error("Wrap with EnrollmentProvider");
  return ctx;
};