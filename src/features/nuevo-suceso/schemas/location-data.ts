import z from "zod";

export const locationSchema = z.object({
  lugar: z.string().min(1, "Ingrese una referencia"),
  direccion: z.string().min(5, "Ingrese una dirección válida"),
  latitud: z
    .number()
    .min(-90, "La latitud debe estar entre -90 y 90")
    .max(90, "La latitud debe estar entre -90 y 90"),
  longitud: z
    .number()
    .min(-180, "La longitud debe estar entre -180 y 180")
    .max(180, "La longitud debe estar entre -180 y 180"),
});

export type LocationFormValues = z.infer<typeof locationSchema>;
