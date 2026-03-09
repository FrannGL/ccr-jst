import { z } from "zod";

export const reviewSchema = z.object({
  review: z.string().min(10, "La reseña debe tener al menos 10 caracteres"),
  sourceLink: z
    .string()
    .url("Ingrese un link válido")
    .optional()
    .or(z.literal("")),
});

export type ReviewFormValues = z.infer<typeof reviewSchema>;
