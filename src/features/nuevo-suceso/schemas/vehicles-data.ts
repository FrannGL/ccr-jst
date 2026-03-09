import z from "zod";

export const vehicleSchema = z.object({
  id: z.string(), // Para react-hook-form field array
  type: z.string().min(1, "Seleccione un tipo de vehículo"),
  // Aeronautico
  matricula: z.string().optional(),
  fabricante: z.string().optional(),
  modelo: z.string().optional(),
  serie: z.string().optional(),
  // Automotor
  dominio: z.string().optional(),
  linea: z.string().optional(),
  operador: z.string().optional(),
  marca: z.string().optional(),
  // General fallback
  nombre: z.string().optional(),
});

export const vehiclesSchema = z.object({
  vehicles: z.array(vehicleSchema),
});

export type VehicleFormValues = z.infer<typeof vehicleSchema>;
export type VehiclesFormValues = z.infer<typeof vehiclesSchema>;
