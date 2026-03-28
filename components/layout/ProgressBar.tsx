"use client";

import { motion } from "framer-motion";

export default function ProgressBar({ step }: { step: number }) {
  const progress = (step / 4) * 100;

  return (
    <div className="mb-6">
      <p className="text-sm mb-2">Step {step} / 4</p>

      <div className="h-2 bg-gray-200 rounded">
        <motion.div
          className="h-2 bg-black rounded"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}