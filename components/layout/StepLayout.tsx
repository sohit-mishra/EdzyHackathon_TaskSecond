"use client";

import { usePathname } from "next/navigation";
import StepHeader from "./StepHeader";
import PageTransition from "../common/PageTransition";

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
    },
    {
      key: "step-2",
      title: "Academic Details",
      step: 2,
    },
    {
      key: "step-3",
      title: "Address & Guardian",
      step: 3,
    },
    {
      key: "review",
      title: "Review & Submit",
      step: 4,
    },
  ];

  const current =
    config.find((c) => pathname.includes(c.key)) ||
    config[0];

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center">
      <div className="w-full max-w-xl p-4">

        {/* Header */}
        <StepHeader
          title={current.title}
          step={current.step}
          showBack={current.step !== 1}
        />

        {/* Animated Content */}
        <PageTransition>{children}</PageTransition>

      </div>
    </div>
  );
}