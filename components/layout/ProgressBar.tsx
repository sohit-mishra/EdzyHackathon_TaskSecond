"use client";

import { motion } from "framer-motion";

interface ProgressBarProps {
  currentStep: number;
  totalSteps?: number;
}

export default function ProgressBar({
  currentStep,
  totalSteps = 4,
}: ProgressBarProps) {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-3">
        <p className="text-sm font-medium text-gray-600">Progress</p>
        <p className="text-sm font-medium text-gray-600">
          {currentStep} of {totalSteps}
        </p>
      </div>

      <div className="h-3 bg-gray-200 rounded-full overflow-hidden shadow-sm">
        <motion.div
          className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}