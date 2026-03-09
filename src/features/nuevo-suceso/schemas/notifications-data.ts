import { z } from "zod";

export const notificationsSchema = z.object({
  notificationChannel: z.string().min(1, "Seleccione un canal de notificación"),
  notifyingOrganism: z.string().min(1, "Ingrese el organismo que notifica"),
  notificationDate: z.date({
    message: "Seleccione una fecha de notificación",
  }),
  notificationTime: z.string().min(1, "Ingrese la hora de notificación"),
});

export type NotificationsFormValues = z.infer<typeof notificationsSchema>;
