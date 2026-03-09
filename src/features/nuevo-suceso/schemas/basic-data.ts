import z from "zod";

export const basicDataSchema = z.object({
  transportMode: z.string().min(1, "Seleccione un modo de transporte"),
  eventClassification: z.string().min(1, "Seleccione una clasificación"),
  eventDate: z.date().refine((date) => date !== undefined, {
    message: "Seleccione una fecha",
  }),
  eventTime: z.string().min(1, "Ingrese una hora"),
  weatherCondition: z.string().min(1, "Seleccione una condición meteorológica"),
});

export type BasicDataFormValues = z.infer<typeof basicDataSchema>;
