"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

type Props = {
  title: string;
  step: number;
  total?: number;
  showBack?: boolean;
};

export default function StepHeader({
  title,
  step,
  total = 4,
  showBack = true,
}: Props) {
  const router = useRouter();
  const progress = (step / total) * 100;

  return (
    <div className="mb-6">
      {/* Top Row */}
      <div className="flex items-center justify-between mb-2">
        {showBack ? (
          <button
            onClick={() => router.back()}
            className="text-sm text-gray-600 hover:text-black"
          >
            ← Back
          </button>
        ) : (
          <div />
        )}

        <span className="text-sm text-gray-500">
          Step {step} / {total}
        </span>
      </div>

      {/* Title */}
      <h1 className="text-xl font-semibold mb-3">{title}</h1>

      {/* Progress Bar */}
      <div className="h-2 bg-gray-200 rounded overflow-hidden">
        <motion.div
          className="h-full bg-black"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.4 }}
        />
      </div>
    </div>
  );
}