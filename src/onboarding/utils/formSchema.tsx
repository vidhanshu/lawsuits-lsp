import * as z from "zod";

const MAXFILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_FILES = [
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/msword",
];
const ACCEPTED_IMGS = ["image/png", "image/jpg", "image/jpeg"];

const achivementValidation = z
  .object({
    description: z.string().min(2).max(1000),
    proof: z
      .any()
      .refine(
        (file: File) => ACCEPTED_FILES.includes(file?.type),
        "File must be doc, docx or pdf"
      )
      .refine(
        (file: File) => file?.size <= MAXFILE_SIZE,
        "file size must be less than 5MB"
      ),
  })
  .refine((data) => {
    if (!data) return true;
    if (data.description && !data.proof) return false;
    if (!data.description && data.proof) return false;
    return true;
  }, "Both achivements fields are required");

export const onboardingFormSchema = z.object({
  profilePic: z
    .any()
    .refine(
      (file: File) => ACCEPTED_IMGS.includes(file?.type),
      "file must be png, jpg or jpeg"
    ),
  firstName: z.string().min(2).max(100),
  lastName: z.string().min(2).max(100),
  city: z.string().min(2).max(100),
  state: z.string().min(2).max(100),
  profession: z.enum([
    "ADVOCATE",
    "LAWYER",
    "DOCUMENT_WRITER",
    "ARBITRATOR",
    "MEDIATOR",
    "OTHER",
  ]),
  additionalDetails: z.object({
    summary: z.string().min(2).max(1000),
    experience: z
      .string()
      .min(1)
      .max(100)
      .refine((val) => {
        if (Number(val) < 0) return false;
        return true;
      }),
    enrollmentId: z.string().min(2).max(100).refine((val : string) => /^[A-Z]{2}\d{1,5}\/\d{2}$/.test(val),"Invalid Bar Id Format"),
    proof: z
      .any()
      .refine(
        (file: File) => ACCEPTED_FILES.includes(file?.type),
        "File must be doc, docx or pdf"
      )
      .refine(
        (file: File) => file?.size <= MAXFILE_SIZE,
        "file size must be less than 5MB"
      ),
    specialities: z.array(z.string().min(2).max(100)),
    languages: z.array(z.string().min(2).max(100)),
    fees: z
      .string()
      .max(100)
      .refine((val) => {
        if (Number(val) < 0) return false;
        return true;
      }),
    achivements: achivementValidation,
  }),
});

export const onboardingFormWithAchivementNoSchema = z.object({
  profilePic: z
    .any()
    .refine(
      (file: File) => ACCEPTED_IMGS.includes(file?.type),
      "file must be png, jpg or jpeg"
    ),
  firstName: z.string().min(2).max(100),
  lastName: z.string().min(2).max(100),
  city: z.string().min(2).max(100),
  state: z.string().min(2).max(100),
  profession: z.enum([
    "ADVOCATE",
    "LAWYER",
    "DOCUMENT_WRITER",
    "ARBITRATOR",
    "MEDIATOR",
    "OTHER",
  ]),
  additionalDetails: z.object({
    summary: z.string().min(2).max(1000),
    experience: z.string().min(1).max(100),
    enrollmentId: z.string().min(2).max(100).refine((val : string) => /^[A-Z]{2}\d{1,5}\/\d{2}$/.test(val),"Invalid Bar Id Format"),
    proof: z
      .any()
      .refine(
        (file: File) => ACCEPTED_FILES.includes(file?.type),
        "File must be doc, docx or pdf"
      )
      .refine(
        (file: File) => file?.size <= MAXFILE_SIZE,
        "file size must be less than 5MB"
      ),
    specialities: z.array(z.string().min(2).max(100)),
    languages: z.array(z.string().min(2).max(100)),
    fees: z.string().max(100),
    achivements: z.object({
      description: z.string().min(2).max(1000).optional(),
      proof: z
        .any()
        .refine(
          (file: File) => ACCEPTED_FILES.includes(file?.type),
          "File must be doc, docx or pdf"
        )
        .refine(
          (file: File) => file?.size <= MAXFILE_SIZE,
          "file size must be less than 5MB"
        )
        .optional(),
    }),
  }),
});

export const defaultOnboardingFormValues = {
  firstName: "",
  lastName: "",
  city: "",
  state: "",
  additionalDetails: {
    summary: "",
    experience: "0",
    enrollmentId: "",
    proof: "",
    specialities: [],
    languages: [],
    fees: "0",
    achivements: {},
  },
};
