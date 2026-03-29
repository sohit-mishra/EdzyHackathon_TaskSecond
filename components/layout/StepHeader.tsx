"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

type Props = {
  title: string;
  description?: string;
  step: number;
  totalSteps?: number;
  showBack?: boolean;
};

export default function StepHeader({
  title,
  description,
  step,
  totalSteps = 4,
  showBack = true,
}: Props) {
  const router = useRouter();
  const progress = (step / totalSteps) * 100;

  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-6 text-white">
      {/* Top Row with Back Button */}
      <div className="flex items-center justify-between mb-4">
        {showBack ? (
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-blue-100 hover:text-white transition-colors text-sm font-medium"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>
        ) : (
          <div />
        )}

        <span className="text-blue-100 text-sm font-medium">
          Step {step} of {totalSteps}
        </span>
      </div>

      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="text-2xl font-bold mb-2"
      >
        {title}
      </motion.h1>

      {/* Description */}
      {description && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="text-blue-100 text-sm"
        >
          {description}
        </motion.p>
      )}

      {/* Embedded Progress Bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mt-6 h-1 bg-blue-400 rounded-full overflow-hidden"
      >
        <motion.div
          className="h-full bg-white"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
      </motion.div>
    </div>
  );
}