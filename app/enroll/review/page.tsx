"use client";

import { useEnrollmentStore } from "@/store/enrollment.store";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function Review() {
  const { data, reset } = useEnrollmentStore();
  const router = useRouter();

  const submit = async () => {
    await new Promise((r) => setTimeout(r, 1000));
    alert("Success!");
    console.log(data);
    reset();
    router.push("/enroll/step-1");
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <pre className="bg-gray-100 p-4 rounded text-sm">
        {JSON.stringify(data, null, 2)}
      </pre>

      <div className="flex gap-2 mt-4">
        <button onClick={() => router.push("/enroll/step-1")} className="btn-outline">Edit</button>
        <button onClick={submit} className="btn">Submit</button>
      </div>
    </motion.div>
  );
}