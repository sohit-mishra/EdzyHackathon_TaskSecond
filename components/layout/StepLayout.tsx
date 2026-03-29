"use client";

import { usePathname } from "next/navigation";
import StepHeader from "./StepHeader";
import PageTransition from "../common/PageTransition";
import ProgressBar from "./ProgressBar";
import { motion } from "framer-motion";

export default function StepLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const config = [
    {
      key: "step-1",
      title: "Student Details",
      step: 1,
      description: "Tell us about yourself",
    },
    {
      key: "step-2",
      title: "Academic Details",
      step: 2,
      description: "Share your academic goals",
    },
    {
      key: "step-3",
      title: "Address & Guardian",
      step: 3,
      description: "Location and contact info",
    },
    {
      key: "review",
      title: "Review & Submit",
      step: 4,
      description: "Confirm your information",
    },
  ];

  const current =
    config.find((c) => pathname.includes(c.key)) ||
    config[0];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 py-8 px-4">
      <div className="w-full max-w-2xl mx-auto">
        {/* Progress Bar */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-8"
        >
          <ProgressBar currentStep={current.step} totalSteps={4} />
        </motion.div>

        {/* Card Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
        >
          {/* Header */}
          <StepHeader
            title={current.title}
            description={current.description}
            step={current.step}
            totalSteps={4}
          />

          {/* Content */}
          <div className="p-8">
            <PageTransition>{children}</PageTransition>
          </div>
        </motion.div>

        {/* Footer Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-6 text-center text-sm text-gray-500"
        >
          <p>Step {current.step} of 4</p>
        </motion.div>
      </div>
    </div>
  );
}