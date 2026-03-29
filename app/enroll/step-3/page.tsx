"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { step3Schema, type Step3FormValues } from "@/schemas/step3.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEnrollmentStore } from "@/store/enrollment.store";
import { useStepGuard } from "@/hooks/useStepGuard";
import { useFormPersist, loadPersisted } from "@/hooks/useFormPersist";
import { motion } from "framer-motion";
import { PAYMENT_PLAN, PAYMENT_MODE } from "@/lib/constants";
import { PIN_MAP } from "@/lib/pinData";
import ErrorMessage from "@/components/common/ErrorMessage";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

export default function Step3() {
  useStepGuard(3);

  const router = useRouter();
  const { setStepData, data } = useEnrollmentStore();
  const [pinState, setPinState] = useState<string | null>(null);
  const [pinCity, setPinCity] = useState<string | null>(null);

  // Load persisted draft data if store is empty
  const draftData = loadPersisted<Partial<Step3FormValues>>("step3-draft");
  const initialData = {
    pincode: data.step3?.pincode ?? draftData?.pincode ?? "",
    state: data.step3?.state ?? draftData?.state ?? "",
    city: data.step3?.city ?? draftData?.city ?? "",
    address: data.step3?.address ?? draftData?.address ?? "",
    guardianName: data.step3?.guardianName ?? draftData?.guardianName ?? "",
    guardianMobile: data.step3?.guardianMobile ?? draftData?.guardianMobile ?? "",
    plan: data.step3?.plan ?? draftData?.plan ?? "Quarterly",
    payment: data.step3?.payment ?? draftData?.payment ?? "UPI",
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    watch,
    setValue,
  } = useForm<Step3FormValues>({
    resolver: zodResolver(step3Schema),
    mode: "onBlur",
    defaultValues: initialData,
  });

  const pincode = watch("pincode");
  const formData = watch();

  // Auto-persist form data to localStorage
  useFormPersist("step3-draft", formData);

  // Auto-fill state and city from PIN
  useEffect(() => {
    if (pincode && pincode.length === 6 && PIN_MAP[pincode]) {
      const { state, city } = PIN_MAP[pincode];
      setValue("state", state, { shouldValidate: true });
      setValue("city", city, { shouldValidate: true });
      setPinState(state);
      setPinCity(city);
    } else {
      setPinState(null);
      setPinCity(null);
    }
  }, [pincode, setValue]);

  const onSubmit = (formData: Step3FormValues) => {
    setStepData("step3", formData);
    router.push("/enroll/review");
  };

  return (
    <motion.div
      initial={{ x: 50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Address Section */}
        <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Address Details</h3>

          {/* PIN Code */}
          <div className="mb-4">
            <label htmlFor="pincode" className="block text-sm font-medium text-gray-700 mb-2">
              PIN Code
              <span className="text-red-500 ml-1">*</span>
            </label>
            <input
              id="pincode"
              type="text"
              placeholder="6-digit PIN code"
              maxLength={6}
              {...register("pincode")}
              className={cn(
                "w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all",
                errors.pincode ? "border-red-500" : "border-gray-300"
              )}
            />
            {errors.pincode && (
              <ErrorMessage message={errors.pincode.message} />
            )}
          </div>

          {/* State */}
          <div className="mb-4">
            <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-2">
              State/UT
              <span className="text-red-500 ml-1">*</span>
              {pinState && <span className="text-xs text-green-600 ml-2">(Auto-filled from PIN)</span>}
            </label>
            <input
              id="state"
              type="text"
              placeholder="State or Union Territory"
              readOnly={!!pinState}
              {...register("state")}
              className={cn(
                "w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all",
                pinState ? "bg-gray-100 cursor-not-allowed" : "",
                errors.state ? "border-red-500" : "border-gray-300"
              )}
            />
            {errors.state && (
              <ErrorMessage message={errors.state.message} />
            )}
          </div>

          {/* City */}
          <div>
            <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
              City
              <span className="text-red-500 ml-1">*</span>
              {pinCity && <span className="text-xs text-green-600 ml-2">(Auto-filled from PIN)</span>}
            </label>
            <input
              id="city"
              type="text"
              placeholder="City name"
              readOnly={!!pinCity}
              {...register("city")}
              className={cn(
                "w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all",
                pinCity ? "bg-gray-100 cursor-not-allowed" : "",
                errors.city ? "border-red-500" : "border-gray-300"
              )}
            />
            {errors.city && (
              <ErrorMessage message={errors.city.message} />
            )}
          </div>
        </div>

        {/* Address Line */}
        <div>
          <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
            Address Line (Street, Building, Landmark)
            <span className="text-red-500 ml-1">*</span>
          </label>
          <textarea
            id="address"
            placeholder="Enter your complete address (10-120 characters)"
            rows={3}
            {...register("address")}
            className={cn(
              "w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none",
              errors.address ? "border-red-500" : "border-gray-300"
            )}
          />
          {errors.address && (
            <ErrorMessage message={errors.address.message} />
          )}
        </div>

        {/* Guardian Section */}
        <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Guardian Information</h3>

          {/* Guardian Name */}
          <div className="mb-4">
            <label htmlFor="guardianName" className="block text-sm font-medium text-gray-700 mb-2">
              Guardian Name
              <span className="text-red-500 ml-1">*</span>
            </label>
            <input
              id="guardianName"
              type="text"
              placeholder="Parent/Guardian name"
              {...register("guardianName")}
              className={cn(
                "w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all",
                errors.guardianName ? "border-red-500" : "border-gray-300"
              )}
            />
            {errors.guardianName && (
              <ErrorMessage message={errors.guardianName.message} />
            )}
          </div>

          {/* Guardian Mobile */}
          <div>
            <label htmlFor="guardianMobile" className="block text-sm font-medium text-gray-700 mb-2">
              Guardian Mobile
              <span className="text-red-500 ml-1">*</span>
            </label>
            <div className="flex">
              <span className="inline-flex items-center px-4 py-2 bg-gray-100 border border-gray-300 border-r-0 rounded-l-lg text-gray-700 font-medium">
                +91
              </span>
              <input
                id="guardianMobile"
                type="tel"
                placeholder="10-digit mobile number"
                maxLength={10}
                {...register("guardianMobile")}
                className={cn(
                  "flex-1 px-4 py-2 border rounded-r-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all",
                  errors.guardianMobile ? "border-red-500" : "border-gray-300"
                )}
              />
            </div>
            {errors.guardianMobile && (
              <ErrorMessage message={errors.guardianMobile.message} />
            )}
          </div>
        </div>

        {/* Payment Section */}
        <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Details</h3>

          {/* Payment Plan */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Payment Plan
              <span className="text-red-500 ml-1">*</span>
            </label>
            <div className="space-y-2">
              {PAYMENT_PLAN.map((planOption) => (
                <label
                  key={planOption}
                  className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-white cursor-pointer transition-all"
                >
                  <input
                    type="radio"
                    value={planOption}
                    {...register("plan")}
                    className="w-5 h-5 text-blue-600 focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="text-gray-700">{planOption}</span>
                </label>
              ))}
            </div>
            {errors.plan && (
              <ErrorMessage message={errors.plan.message} />
            )}
          </div>

          {/* Payment Mode */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Payment Mode
              <span className="text-red-500 ml-1">*</span>
            </label>
            <div className="space-y-2">
              {PAYMENT_MODE.map((modeOption) => (
                <label
                  key={modeOption}
                  className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-white cursor-pointer transition-all"
                >
                  <input
                    type="radio"
                    value={modeOption}
                    {...register("payment")}
                    className="w-5 h-5 text-blue-600 focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="text-gray-700">{modeOption}</span>
                </label>
              ))}
            </div>
            {errors.payment && (
              <ErrorMessage message={errors.payment.message} />
            )}
          </div>
        </div>

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
            {isSubmitting ? "Loading..." : "Review"}
          </button>
        </div>
      </form>
    </motion.div>
  );
}