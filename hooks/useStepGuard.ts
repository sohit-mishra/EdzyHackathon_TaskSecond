"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useEnrollmentStore } from "@/store/enrollment.store";

export const useStepGuard = (step: number) => {
  const router = useRouter();
  const { data } = useEnrollmentStore();

  useEffect(() => {
    if (step > 1 && !data.step1?.fullName) {
      router.replace("/enroll/step-1");
    }
    if (step > 2 && !data.step2?.goal) {
      router.replace("/enroll/step-2");
    }
  }, [step, data, router]);
};