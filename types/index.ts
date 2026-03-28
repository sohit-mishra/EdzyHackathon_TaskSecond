export type Step1Type = {
  fullName: string;
  email: string;
  mobile: string;
  class: "9" | "10" | "11" | "12";
  board: "CBSE" | "ICSE" | "State Board";
  language: "English" | "Hindi" | "Hinglish";
};

export type Step2Type = {
  subjects: string[];
  goal: string;
  hours: number;
  scholarship: boolean;
  percentage?: number;
  achievements?: string;
};

export type Step3Type = {
  pincode: string;
  state: string;
  city: string;
  address: string;
  guardianName: string;
  guardianMobile: string;
  plan: "Quarterly" | "Half-Yearly" | "Annual";
  payment: "UPI" | "Card" | "NetBanking";
};

export type EnrollmentData = {
  step1: Partial<Step1Type>;
  step2: Partial<Step2Type>;
  step3: Partial<Step3Type>;
};