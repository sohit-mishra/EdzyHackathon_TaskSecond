import { step1Schema } from "./step1.schema";
import { step2Schema } from "./step2.schema";
import { step3Schema } from "./step3.schema";

export const combinedSchema = step1Schema
  .merge(step2Schema)
  .merge(step3Schema);