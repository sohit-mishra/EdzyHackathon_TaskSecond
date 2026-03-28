"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { step3Schema } from "@/schemas/step3.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEnrollmentStore } from "@/store/enrollment.store";
import { useStepGuard } from "@/hooks/useStepGuard";
import { motion } from "framer-motion";

export default function Step3() {
  useStepGuard(3);

  const router = useRouter();
  const { setStepData } = useEnrollmentStore();

  const { register, handleSubmit } = useForm({
    resolver: zodResolver(step3Schema),
  });

  const onSubmit = (data: any) => {
    setStepData("step3", data);
    router.push("/enroll/review");
  };

  return (
    <motion.div initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

        <input {...register("pincode")} placeholder="Pincode" className="input" />
        <input {...register("state")} placeholder="State" className="input" />
        <input {...register("city")} placeholder="City" className="input" />
        <input {...register("address")} placeholder="Address" className="input" />

        <input {...register("guardianName")} placeholder="Guardian Name" className="input" />
        <input {...register("guardianMobile")} placeholder="Guardian Mobile" className="input" />

        <select {...register("plan")} className="input">
          <option>Quarterly</option>
          <option>Half-Yearly</option>
          <option>Annual</option>
        </select>

        <select {...register("payment")} className="input">
          <option>UPI</option>
          <option>Card</option>
          <option>NetBanking</option>
        </select>

        <div className="flex justify-between">
          <button type="button" onClick={() => router.back()} className="btn-outline">Back</button>
          <button className="btn">Review</button>
        </div>

      </form>
    </motion.div>
  );
}