"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useEnrollmentStore } from "@/store/enrollment.store";

/**
 * Hook to guard navigation between enrollment steps
 * Prevents users from skipping steps
 */
export const useStepGuard = (requiredStep: number) => {
  const router = useRouter();
  const { data } = useEnrollmentStore();

  useEffect(() => {
    // Check if all previous steps are completed
    
    // Step 2+ requires Step 1 completion
    if (requiredStep >= 2) {
      const step1Valid = data.step1?.fullName && data.step1?.email && data.step1?.mobile;
      if (!step1Valid) {
        router.replace("/enroll/step-1");
        return;
      }
    }

    // Step 3+ requires Step 2 completion
    if (requiredStep >= 3) {
      const step2Valid =
        data.step2?.goal &&
        data.step2?.hours &&
        data.step2?.subjects &&
        data.step2.subjects.length > 0;
      if (!step2Valid) {
        router.replace("/enroll/step-2");
        return;
      }
    }

    // Step 4+ requires Step 3 completion
    if (requiredStep >= 4) {
      const step3Valid =
        data.step3?.pincode &&
        data.step3?.state &&
        data.step3?.city &&
        data.step3?.address &&
        data.step3?.guardianName &&
        data.step3?.guardianMobile &&
        data.step3?.plan &&
        data.step3?.payment;
      if (!step3Valid) {
        router.replace("/enroll/step-3");
        return;
      }
    }
  }, [requiredStep, data, router]);
};