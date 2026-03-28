"use client";

import { motion } from "framer-motion";

export default function SuccessScreen() {
  return (
    <motion.div
      className="text-center py-10"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
    >
      <h2 className="text-2xl font-bold mb-2">🎉 Success!</h2>
      <p className="text-gray-600">Your enrollment is submitted.</p>
    </motion.div>
  );
}