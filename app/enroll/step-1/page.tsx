"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { step1Schema, type Step1FormValues } from "@/schemas/step1.schema";
import { useEnrollmentStore } from "@/store/enrollment.store";
import { useFormPersist, loadPersisted } from "@/hooks/useFormPersist";
import { motion } from "framer-motion";
import { CLASS_OPTIONS, BOARD_OPTIONS, LANGUAGE_OPTIONS } from "@/lib/constants";
import ErrorMessage from "@/components/common/ErrorMessage";
import { cn } from "@/lib/utils";

export default function Step1() {
  const router = useRouter();
  const { setStepData, data } = useEnrollmentStore();

  // Load persisted draft data if store is empty
  const draftData = loadPersisted<Partial<Step1FormValues>>("step1-draft");
  const initialData = {
    fullName: data.step1?.fullName ?? draftData?.fullName ?? "",
    email: data.step1?.email ?? draftData?.email ?? "",
    mobile: data.step1?.mobile ?? draftData?.mobile ?? "",
    class: data.step1?.class ?? draftData?.class ?? undefined,
    board: data.step1?.board ?? draftData?.board ?? undefined,
    language: data.step1?.language ?? draftData?.language ?? undefined,
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    watch,
  } = useForm<Step1FormValues>({
    resolver: zodResolver(step1Schema),
    mode: "onBlur",
    defaultValues: initialData as any,
  });

  // Auto-persist form data to localStorage
  const formData = watch();
  useFormPersist("step1-draft", formData);

  const onSubmit = (formData: Step1FormValues) => {
    setStepData("step1", formData);
    router.push("/enroll/step-2");
  };

  return (
    <motion.div
      initial={{ x: 50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Full Name */}
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
            Full Name
            <span className="text-red-500 ml-1">*</span>
          </label>
          <input
            id="fullName"
            type="text"
            placeholder="Enter your full name"
            {...register("fullName")}
            className={cn(
              "w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all",
              errors.fullName ? "border-red-500" : "border-gray-300"
            )}
          />
          {errors.fullName && (
            <ErrorMessage message={errors.fullName.message} />
          )}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            Email Address
            <span className="text-red-500 ml-1">*</span>
          </label>
          <input
            id="email"
            type="email"
            placeholder="your.email@example.com"
            {...register("email")}
            className={cn(
              "w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all",
              errors.email ? "border-red-500" : "border-gray-300"
            )}
          />
          {errors.email && (
            <ErrorMessage message={errors.email.message} />
          )}
        </div>

        {/* Mobile */}
        <div>
          <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 mb-2">
            Mobile Number
            <span className="text-red-500 ml-1">*</span>
          </label>
          <div className="flex">
            <span className="inline-flex items-center px-4 py-2 bg-gray-100 border border-gray-300 border-r-0 rounded-l-lg text-gray-700 font-medium">
              +91
            </span>
            <input
              id="mobile"
              type="tel"
              placeholder="10-digit mobile number"
              maxLength={10}
              {...register("mobile")}
              className={cn(
                "flex-1 px-4 py-2 border rounded-r-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all",
                errors.mobile ? "border-red-500" : "border-gray-300"
              )}
            />
          </div>
          {errors.mobile && (
            <ErrorMessage message={errors.mobile.message} />
          )}
        </div>

        {/* Class */}
        <div>
          <label htmlFor="class" className="block text-sm font-medium text-gray-700 mb-2">
            Class
            <span className="text-red-500 ml-1">*</span>
          </label>
          <select
            id="class"
            {...register("class")}
            className={cn(
              "w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all bg-white",
              errors.class ? "border-red-500" : "border-gray-300"
            )}
          >
            <option value="">Select your class</option>
            {CLASS_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                Class {opt}
              </option>
            ))}
          </select>
          {errors.class && (
            <ErrorMessage message={errors.class.message} />
          )}
        </div>

        {/* Board */}
        <div>
          <label htmlFor="board" className="block text-sm font-medium text-gray-700 mb-2">
            Board
            <span className="text-red-500 ml-1">*</span>
          </label>
          <select
            id="board"
            {...register("board")}
            className={cn(
              "w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all bg-white",
              errors.board ? "border-red-500" : "border-gray-300"
            )}
          >
            <option value="">Select your board</option>
            {BOARD_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
          {errors.board && (
            <ErrorMessage message={errors.board.message} />
          )}
        </div>

        {/* Language */}
        <div>
          <label htmlFor="language" className="block text-sm font-medium text-gray-700 mb-2">
            Preferred Language
            <span className="text-red-500 ml-1">*</span>
          </label>
          <select
            id="language"
            {...register("language")}
            className={cn(
              "w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all bg-white",
              errors.language ? "border-red-500" : "border-gray-300"
            )}
          >
            <option value="">Select your preferred language</option>
            {LANGUAGE_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
          {errors.language && (
            <ErrorMessage message={errors.language.message} />
          )}
        </div>

        {/* Submit Button */}
        <div className="pt-6 flex gap-3">
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