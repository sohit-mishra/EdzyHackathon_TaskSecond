import { sleep } from "@/lib/utils";
import type { EnrollmentData } from "@/types";

export async function submitEnrollment(data: EnrollmentData) {
  // simulate API delay
  await sleep(1000);

  // validation safeguard (optional extra layer)
  if (!data.step1?.fullName) {
    throw new Error("Invalid submission");
  }

  console.log("FINAL SUBMISSION PAYLOAD:", data);

  return {
    success: true,
    message: "Enrollment submitted successfully",
  };
}