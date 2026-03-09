import { z } from "zod";

export const validationSchema = z.object({
  responseType: z.string().min(1, "Seleccione el tipo de respuesta"),
  observations: z.string().optional().or(z.literal("")),
});

export type ValidationFormValues = z.infer<typeof validationSchema>;
