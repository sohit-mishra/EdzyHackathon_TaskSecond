"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { step1Schema } from "@/schemas/step1.schema";
import { useEnrollmentStore } from "@/store/enrollment.store";
import { motion } from "framer-motion";

export default function Step1() {
  const router = useRouter();
  const { setStepData } = useEnrollmentStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(step1Schema),
  });

  const onSubmit = (data: any) => {
    setStepData("step1", data);
    router.push("/enroll/step-2");
  };

  return (
    <motion.div initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

        <input {...register("fullName")} placeholder="Full Name" className="input" />
        <p className="text-red-500">{errors.fullName?.message as string}</p>

        <input {...register("email")} placeholder="Email" className="input" />
        <p className="text-red-500">{errors.email?.message as string}</p>

        <input {...register("mobile")} placeholder="+91 Mobile" className="input" />

        <select {...register("class")} className="input">
          <option value="">Select Class</option>
          <option value="9">9</option>
          <option value="10">10</option>
          <option value="11">11</option>
          <option value="12">12</option>
        </select>

        <select {...register("board")} className="input">
          <option value="">Board</option>
          <option>CBSE</option>
          <option>ICSE</option>
          <option>State Board</option>
        </select>

        <select {...register("language")} className="input">
          <option value="">Language</option>
          <option>English</option>
          <option>Hindi</option>
          <option>Hinglish</option>
        </select>

        <button className="btn">Next</button>
      </form>
    </motion.div>
  );
}