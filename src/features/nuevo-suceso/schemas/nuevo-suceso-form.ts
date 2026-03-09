import type { z } from "zod";

import type { ReviewFormValues } from "./review-data";
import type { BasicDataFormValues } from "./basic-data";
import type { VehicleFormValues } from "./vehicles-data";
import type { LocationFormValues } from "./location-data";
import type { ValidationFormValues } from "./validation-data";
import type { NotificationsFormValues } from "./notifications-data";

import { reviewSchema } from "./review-data";
import { basicDataSchema } from "./basic-data";
import { locationSchema } from "./location-data";
import { vehiclesSchema } from "./vehicles-data";
import { validationSchema } from "./validation-data";
import { notificationsSchema } from "./notifications-data";

export const nuevoSucesoFormSchema = basicDataSchema
  .extend(locationSchema.shape)
  .extend(vehiclesSchema.shape)
  .extend(notificationsSchema.shape)
  .extend(reviewSchema.shape)
  .extend(validationSchema.shape);

export type NuevoSucesoFormValues = z.infer<typeof nuevoSucesoFormSchema>;

export type AllFormValues = BasicDataFormValues &
  LocationFormValues & {
    vehicles: VehicleFormValues[];
  } & NotificationsFormValues &
  ReviewFormValues &
  ValidationFormValues;
