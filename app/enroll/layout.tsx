"use client";

import StepLayout from "@/components/layout/StepLayout";

export default function EnrollLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <StepLayout>{children}</StepLayout>;
}