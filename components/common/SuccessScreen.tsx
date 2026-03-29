"use client";

import { motion } from "framer-motion";

export default function SuccessScreen() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const checkmarkVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: { duration: 0.6, delay: 0.2 },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex items-center justify-center min-h-[500px] py-10"
    >
      <div className="text-center">
        {/* Animated Checkmark */}
        <motion.div
          variants={checkmarkVariants}
          className="mb-6 flex justify-center"
        >
          <div className="relative w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center">
              <svg
                className="w-10 h-10 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>
        </motion.div>

        {/* Title */}
        <motion.h2 variants={itemVariants} className="text-3xl font-bold text-gray-900 mb-2">
          Enrollment Submitted Successfully! 🎉
        </motion.h2>

        {/* Description */}
        <motion.p variants={itemVariants} className="text-gray-600 mb-4 text-lg">
          Your enrollment has been successfully submitted.
        </motion.p>

        {/* Confirmation Message */}
        <motion.p variants={itemVariants} className="text-gray-500 text-sm">
          A confirmation email will be sent to you shortly. Thank you for enrolling with us!
        </motion.p>

        {/* Loading Indicator */}
        <motion.div variants={itemVariants} className="mt-8 flex justify-center">
          <p className="text-gray-500 text-sm flex items-center gap-2">
            <span className="inline-block w-2 h-2 bg-green-500 rounded-full animate-ping"></span>
            Redirecting to home page...
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}