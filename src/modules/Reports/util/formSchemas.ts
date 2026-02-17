import z from 'zod';

// Schema for Medical Report
export const medicalFormSchema = z.object({
  type: z.literal('medical'),
  assignedTo: z.string().min(2, {
    message: 'Assigned To must be at least 2 characters.',
  }),
  diagnosis: z.string().min(5, {
    message: 'Diagnosis must be at least 5 characters.',
  }),
  treatment: z.string().min(5, {
    message: 'Treatment must be at least 5 characters.',
  }),
  description: z.string().min(10, {
    message: 'Description must be at least 10 characters.',
  }),
});

// Schema for Complaint Report
export const complaintFormSchema = z.object({
  type: z.literal('complaint'),
  assignedTo: z.string().min(2, {
    message: 'Assigned To must be at least 2 characters.',
  }),
  description: z.string().min(10, {
    message: 'Description must be at least 10 characters.',
  }),
});

// Additional schemas for other report types (release, transfer, vacation) can be defined similarly
export const releaseFormSchema = z.object({
  type: z.literal('release'),
  assignedTo: z.string().min(2, {
    message: 'Assigned To must be at least 2 characters.',
  }),
  releaseDate: z.string().min(10, {
    message: 'Release date must be at least 10 characters.',
  }),
  reason: z.string().min(10, {
    message: 'Reason must be at least 10 characters.',
  }),
});

// Additional schemas for other report types (release, transfer, vacation) can be defined similarly
export const transferFormSchema = z.object({
  type: z.literal('transfer'),
  assignedTo: z.string().min(2, {
    message: 'Assigned To must be at least 2 characters.',
  }),
  transferFrom: z.string().min(2, {
    message: 'Transfer From must be at least 2 characters.',
  }),
  transferTo: z.string().min(2, {
    message: 'Transfer To must be at least 2 characters.',
  }),
  reason: z.string().min(10, {
    message: 'Reason must be at least 10 characters.',
  }),
});

// Additional schemas for other report types (release, transfer, vacation) can be defined similarly
export const vacationFormSchema = z.object({
  type: z.literal('vacation'),
  assignedTo: z.string().min(2, {
    message: 'Assigned To must be at least 2 characters.',
  }),
  vacationFrom: z.string().min(2, {
    message: 'Vacation From must be at least 2 characters.',
  }),
  vacationTo: z.string().min(2, {
    message: 'Vacation To must be at least 2 characters.',
  }),
});

// Discriminated union of all report types for form validation
export const createUpdateFormSchema = z.discriminatedUnion('type', [
  complaintFormSchema,
  medicalFormSchema,
  releaseFormSchema,
  transferFormSchema,
  vacationFormSchema,
]);
