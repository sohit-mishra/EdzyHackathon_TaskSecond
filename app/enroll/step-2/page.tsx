"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { step2Schema, type Step2FormValues } from "@/schemas/step2.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEnrollmentStore } from "@/store/enrollment.store";
import { useStepGuard } from "@/hooks/useStepGuard";
import { useFormPersist, loadPersisted } from "@/hooks/useFormPersist";
import { motion } from "framer-motion";
import { SUBJECT_MAP, GOALS, PAYMENT_PLAN } from "@/lib/constants";
import ErrorMessage from "@/components/common/ErrorMessage";
import { cn } from "@/lib/utils";

export default function Step2() {
  useStepGuard(2);

  const router = useRouter();
  const { setStepData, data } = useEnrollmentStore();

  // Load persisted draft data if store is empty
  const draftData = loadPersisted<Partial<Step2FormValues>>("step2-draft");
  const initialData = {
    class: data.step1?.class ?? draftData?.class ?? undefined,
    subjects: data.step2?.subjects ?? draftData?.subjects ?? [],
    goal: data.step2?.goal ?? draftData?.goal ?? "",
    hours: data.step2?.hours ?? draftData?.hours ?? 1,
    scholarship: data.step2?.scholarship ?? draftData?.scholarship ?? false,
    percentage: data.step2?.percentage ?? draftData?.percentage ?? undefined,
    achievements: data.step2?.achievements ?? draftData?.achievements ?? "",
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    watch,
    setValue,
  } = useForm<Step2FormValues>({
    resolver: zodResolver(step2Schema) as any,
    mode: "onBlur",
    defaultValues: initialData as any,
  });

  const classValue = watch("class");
  const scholarship = watch("scholarship");
  const selectedSubjects = watch("subjects");
  const formData = watch();

  // Auto-persist form data to localStorage
  useFormPersist("step2-draft", formData);

  const availableSubjects = classValue ? SUBJECT_MAP[classValue] || [] : [];
  const minSubjectsRequired = classValue === "9" || classValue === "10" ? 2 : 3;

  const toggleSubject = (subject: string) => {
    const current = selectedSubjects || [];
    if (current.includes(subject)) {
      setValue("subjects", current.filter((s: string) => s !== subject), { 
        shouldValidate: true,
      });
    } else {
      setValue("subjects", [...current, subject], { 
        shouldValidate: true,
      });
    }
  };

  const onSubmit = (formData: Step2FormValues) => {
    setStepData("step2", formData);
    router.push("/enroll/step-3");
  };

  return (
    <motion.div
      initial={{ x: 50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Class Field (Hidden but needed for validation) */}
        <input
          type="hidden"
          {...register("class")}
        />

        {/* Subjects */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Subjects
            <span className="text-red-500 ml-1">*</span>
            <span className="text-xs text-gray-500 ml-2">
              (Select at least {minSubjectsRequired})
            </span>
          </label>

          {availableSubjects.length > 0 ? (
            <div className="space-y-2 mb-3">
              {availableSubjects.map((subject) => (
                <label
                  key={subject}
                  className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-all"
                >
                  <input
                    type="checkbox"
                    checked={selectedSubjects?.includes(subject) || false}
                    onChange={() => toggleSubject(subject)}
                    className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="text-gray-700">{subject}</span>
                </label>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-sm mb-3">Please select a class first</p>
          )}

          {/* Selected Chips */}
          {selectedSubjects && selectedSubjects.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {selectedSubjects.map((subject: string) => (
                <div
                  key={subject}
                  className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                >
                  {subject}
                  <button
                    type="button"
                    onClick={() => toggleSubject(subject)}
                    className="text-blue-800 hover:text-blue-600 font-semibold"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}

          {errors.subjects && (
            <ErrorMessage message={errors.subjects.message} />
          )}
        </div>

        {/* Exam Goal */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Exam Goal
            <span className="text-red-500 ml-1">*</span>
          </label>
          <div className="space-y-2">
            {GOALS.map((goalOption) => (
              <label
                key={goalOption}
                className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-all"
              >
                <input
                  type="radio"
                  value={goalOption}
                  {...register("goal")}
                  className="w-5 h-5 text-blue-600 focus:ring-2 focus:ring-blue-500"
                />
                <span className="text-gray-700">{goalOption}</span>
              </label>
            ))}
          </div>
          {errors.goal && (
            <ErrorMessage message={errors.goal.message} />
          )}
        </div>

        {/* Weekly Study Hours */}
        <div>
          <label htmlFor="hours" className="block text-sm font-medium text-gray-700 mb-2">
            Weekly Study Hours (1-40)
            <span className="text-red-500 ml-1">*</span>
          </label>
          <input
            id="hours"
            type="number"
            min="1"
            max="40"
            placeholder="Enter hours"
            {...register("hours", { valueAsNumber: true })}
            className={cn(
              "w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all",
              errors.hours ? "border-red-500" : "border-gray-300"
            )}
          />
          {errors.hours && (
            <ErrorMessage message={(errors.hours?.message as string) || "Invalid input"} />
          )}
        </div>

        {/* Scholarship Checkbox */}
        <div>
          <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-all">
            <input
              type="checkbox"
              {...register("scholarship")}
              className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
            />
            <span className="text-gray-700 font-medium">Apply for Scholarship</span>
          </label>
        </div>

        {/* Conditional Scholarship Fields */}
        {scholarship && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="space-y-4 p-4 bg-blue-50 border border-blue-200 rounded-lg"
          >
            {/* Last Exam Percentage */}
            <div>
              <label htmlFor="percentage" className="block text-sm font-medium text-gray-700 mb-2">
                Last Exam Percentage (0-100)
                <span className="text-red-500 ml-1">*</span>
              </label>
              <input
                id="percentage"
                type="number"
                min="0"
                max="100"
                placeholder="Enter percentage"
                {...register("percentage", { valueAsNumber: true })}
                className={cn(
                  "w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all",
                  errors.percentage ? "border-red-500" : "border-gray-300"
                )}
              />
              {errors.percentage && (
                <ErrorMessage message={(errors.percentage?.message as string) || "Invalid input"} />
              )}
            </div>

            {/* Achievements */}
            <div>
              <label htmlFor="achievements" className="block text-sm font-medium text-gray-700 mb-2">
                Achievements (Optional)
              </label>
              <textarea
                id="achievements"
                placeholder="Describe your academic achievements..."
                rows={3}
                {...register("achievements")}
                className={cn(
                  "w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none",
                  errors.achievements ? "border-red-500" : "border-gray-300"
                )}
              />
              {errors.achievements && (
                <ErrorMessage message={errors.achievements.message} />
              )}
            </div>
          </motion.div>
        )}

        {/* Navigation Buttons */}
        <div className="pt-6 flex gap-3">
          <button
            type="button"
            onClick={() => router.back()}
            className="flex-1 px-6 py-3 rounded-lg font-semibold bg-gray-200 text-gray-800 hover:bg-gray-300 transition-all"
          >
            Back
          </button>
          <button
            type="submit"
            disabled={isSubmitting || !isValid}
            className={cn(
              "flex-1 px-6 py-3 rounded-lg font-semibold transition-all",
              isValid && !isSubmitting
                ? "bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            )}
          >
            {isSubmitting ? "Loading..." : "Next"}
          </button>
        </div>
      </form>
    </motion.div>
  );
}