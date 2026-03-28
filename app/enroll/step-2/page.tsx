"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { step2Schema } from "@/schemas/step2.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEnrollmentStore } from "@/store/enrollment.store";
import { useStepGuard } from "@/hooks/useStepGuard";
import { motion } from "framer-motion";

export default function Step2() {
  useStepGuard(2);

  const router = useRouter();
  const { setStepData } = useEnrollmentStore();

  const { register, handleSubmit, watch } = useForm({
    resolver: zodResolver(step2Schema),
  });

  const scholarship = watch("scholarship");

  const onSubmit = (data: any) => {
    console.log("Step 2 Data:", data);
    setStepData("step2", data);
    router.push("/enroll/step-3");
  };

  return (
    <motion.div initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

        <input {...register("goal")} placeholder="Exam Goal" className="input" />

        <input type="number" {...register("hours")} placeholder="Study Hours" className="input" />

        <label className="flex gap-2">
          <input type="checkbox" {...register("scholarship")} />
          Scholarship?
        </label>

        {scholarship && (
          <input type="number" {...register("percentage")} placeholder="Percentage" className="input" />
        )}

        <div className="flex justify-between">
          <button type="button" onClick={() => router.back()} className="btn-outline">Back</button>
          <button className="btn">Next</button>
        </div>

      </form>
    </motion.div>
  );
}