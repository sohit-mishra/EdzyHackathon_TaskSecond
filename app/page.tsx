"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="h-screen flex items-center justify-center">
      <button
        onClick={() => router.push("/enroll/step-1")}
        className="px-6 py-3 bg-black text-white rounded"
      >
        Start Enrollment
      </button>
    </div>
  );
}