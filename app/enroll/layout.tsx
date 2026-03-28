"use client";

import StepLayout from "@/components/layout/StepLayout";

import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

export default function EnrollLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const path = usePathname();

  const steps = ["step-1", "step-2", "step-3", "review"];
  const currentStep =
    steps.findIndex((s) => path.includes(s)) + 1;

  const progress = (currentStep / 4) * 100;

  return (
    <div className="max-w-xl mx-auto p-4">
      {/* Progress */}
      <div className="mb-6">
        <div className="text-sm mb-2">
          Step {currentStep} / 4
        </div>

        <div className="h-2 bg-gray-200 rounded">
          <motion.div
            className="h-2 bg-black rounded"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {children}
    </div>
  );
}