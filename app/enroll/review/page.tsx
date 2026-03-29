"use client";

import { useEnrollmentStore } from "@/store/enrollment.store";
import { useRouter } from "next/navigation";
import { useStepGuard } from "@/hooks/useStepGuard";
import { clearPersisted } from "@/hooks/useFormPersist";
import { motion } from "framer-motion";
import { useState } from "react";
import SuccessScreen from "@/components/common/SuccessScreen";
import { cn } from "@/lib/utils";

// Summary Card Component
const SummaryCard = ({
  title,
  stepNumber,
  children,
  onEdit,
}: {
  title: string;
  stepNumber: number;
  children: React.ReactNode;
  onEdit: (step: number) => void;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: stepNumber * 0.1 }}
    className="p-6 border border-gray-200 rounded-lg bg-white hover:shadow-md transition-shadow"
  >
    <div className="flex justify-between items-center mb-4">
      <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      <button
        onClick={() => onEdit(stepNumber)}
        className="text-blue-600 hover:text-blue-800 text-sm font-medium underline"
      >
        Edit
      </button>
    </div>
    <div className="space-y-3 text-gray-700">{children}</div>
  </motion.div>
);

// Detail Row Component
const DetailRow = ({
  label,
  value,
}: {
  label: string;
  value: string | number | boolean | React.ReactNode;
}) => (
  <div className="flex justify-between items-start">
    <span className="font-medium text-gray-600">{label}:</span>
    <span className="text-right">
      {typeof value === "boolean" ? (value ? "Yes" : "No") : value}
    </span>
  </div>
);

export default function Review() {
  useStepGuard(4);
  
  const { data, reset } = useEnrollmentStore();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const submitEnrollment = async () => {
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise((r) => setTimeout(r, 2000));
      
      console.log("Enrollment Data:", JSON.stringify(data, null, 2));
      setIsSuccess(true);

      // Clear draft data and reset after 3 seconds
      setTimeout(() => {
        clearPersisted("step1-draft");
        clearPersisted("step2-draft");
        clearPersisted("step3-draft");
        reset();
        router.push("/enroll/step-1");
      }, 3000);
    } catch (error) {
      console.error("Submission error:", error);
      setIsSubmitting(false);
    }
  };

  const handleEdit = (step: number) => {
    router.push(`/enroll/step-${step}`);
  };

  if (isSuccess) {
    return <SuccessScreen />;
  }

  const step1 = data.step1;
  const step2 = data.step2;
  const step3 = data.step3;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Review Your Information
        </h1>
        <p className="text-gray-600">
          Please verify all details before submitting your enrollment
        </p>
      </div>

      {/* Step 1 - Student Details */}
      <SummaryCard title="Student Details" stepNumber={1} onEdit={handleEdit}>
        <DetailRow label="Full Name" value={step1?.fullName || "—"} />
        <DetailRow label="Email" value={step1?.email || "—"} />
        <DetailRow
          label="Mobile"
          value={step1?.mobile ? `+91 ${step1.mobile}` : "—"}
        />
        <DetailRow
          label="Class"
          value={step1?.class ? `Class ${step1.class}` : "—"}
        />
        <DetailRow label="Board" value={step1?.board || "—"} />
        <DetailRow label="Language" value={step1?.language || "—"} />
      </SummaryCard>

      {/* Step 2 - Academic Details */}
      <SummaryCard title="Academic Details" stepNumber={2} onEdit={handleEdit}>
        <DetailRow
          label="Subjects"
          value={
            step2?.subjects && step2.subjects.length > 0 ? (
              <div className="flex flex-wrap gap-2 justify-end">
                {step2.subjects.map((subject) => (
                  <span
                    key={subject}
                    className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                  >
                    {subject}
                  </span>
                ))}
              </div>
            ) : (
              "—"
            )
          }
        />
        <DetailRow label="Exam Goal" value={step2?.goal || "—"} />
        <DetailRow
          label="Weekly Study Hours"
          value={step2?.hours ? `${step2.hours} hours` : "—"}
        />
        <DetailRow
          label="Scholarship"
          value={step2?.scholarship ? "Yes" : "No"}
        />
        {step2?.scholarship && (
          <>
            <DetailRow
              label="Last Exam %"
              value={
                step2?.percentage !== undefined ? `${step2.percentage}%` : "—"
              }
            />
            <DetailRow
              label="Achievements"
              value={
                step2?.achievements ? (
                  <span className="text-right line-clamp-2">
                    {step2.achievements}
                  </span>
                ) : (
                  "Not provided"
                )
              }
            />
          </>
        )}
      </SummaryCard>

      {/* Step 3 - Address & Guardian */}
      <SummaryCard title="Address & Guardian Details" stepNumber={3} onEdit={handleEdit}>
        <div className="p-3 bg-gray-50 rounded-lg mb-4">
          <h4 className="font-semibold text-gray-700 mb-2">Address</h4>
          <DetailRow label="PIN Code" value={step3?.pincode || "—"} />
          <DetailRow label="State/UT" value={step3?.state || "—"} />
          <DetailRow label="City" value={step3?.city || "—"} />
          <DetailRow
            label="Address"
            value={
              step3?.address ? (
                <span className="text-right line-clamp-2">{step3.address}</span>
              ) : (
                "—"
              )
            }
          />
        </div>

        <div className="p-3 bg-gray-50 rounded-lg mb-4">
          <h4 className="font-semibold text-gray-700 mb-2">Guardian Info</h4>
          <DetailRow label="Guardian Name" value={step3?.guardianName || "—"} />
          <DetailRow
            label="Guardian Mobile"
            value={step3?.guardianMobile ? `+91 ${step3.guardianMobile}` : "—"}
          />
        </div>

        <div className="p-3 bg-gray-50 rounded-lg">
          <h4 className="font-semibold text-gray-700 mb-2">Payment</h4>
          <DetailRow label="Payment Plan" value={step3?.plan || "—"} />
          <DetailRow label="Payment Mode" value={step3?.payment || "—"} />
        </div>
      </SummaryCard>

      {/* JSON Data Section (Collapsible) */}
      <details className="p-4 bg-gray-100 rounded-lg border border-gray-300">
        <summary className="cursor-pointer font-semibold text-gray-800 hover:text-gray-900">
          🔍 View Raw JSON Data
        </summary>
        <pre className="mt-4 p-4 bg-white rounded border border-gray-200 overflow-x-auto text-xs">
          {JSON.stringify(data, null, 2)}
        </pre>
      </details>

      {/* Actions */}
      <div className="pt-6 flex gap-3">
        <button
          type="button"
          onClick={() => router.back()}
          disabled={isSubmitting}
          className="flex-1 px-6 py-3 rounded-lg font-semibold bg-gray-200 text-gray-800 hover:bg-gray-300 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Back
        </button>
        <button
          type="button"
          onClick={submitEnrollment}
          disabled={isSubmitting}
          className={cn(
            "flex-1 px-6 py-3 rounded-lg font-semibold transition-all",
            isSubmitting
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-green-600 text-white hover:bg-green-700 cursor-pointer"
          )}
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center gap-2">
              <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              Submitting...
            </span>
          ) : (
            "Submit Enrollment"
          )}
        </button>
      </div>
    </motion.div>
  );
}