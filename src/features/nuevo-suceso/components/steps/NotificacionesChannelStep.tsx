import { format } from "date-fns";
import { es } from "date-fns/locale";
import {
  Mail,
  Clock,
  Phone,
  Radio,
  Users,
  Calendar,
  BellRing,
  Building2,
  MessageCircle,
} from "lucide-react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectItem,
  SelectValue,
  SelectContent,
  SelectTrigger,
} from "@/components/ui/select";

import { notificationChannels } from "../../constants";
import { useNuevoSuceso } from "../../context/NuevoSucesoContext";

export function NotificacionesChannelStep() {
  const { form } = useNuevoSuceso();

  const getChannelIcon = (channel: string) => {
    switch (channel.toLowerCase()) {
      case "whatsapp":
        return <MessageCircle className="w-4 h-4" />;
      case "teléfono":
        return <Phone className="w-4 h-4" />;
      case "mail":
        return <Mail className="w-4 h-4" />;
      case "radio":
        return <Radio className="w-4 h-4" />;
      case "personalmente":
        return <Users className="w-4 h-4" />;
      default:
        return <BellRing className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-8 mx-auto">
      <div className="text-center space-y-2">
        <h3 className="text-lg font-semibold text-gray-800 flex items-center justify-center gap-2">
          <BellRing className="w-5 h-5 text-jst-500" />
          Canal de Notificación
        </h3>
        <p className="text-sm text-gray-500">
          Complete los datos recibidos en la notificación inicial del suceso.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-xl">
        {/* Canal de Notificación */}
        <div className="space-y-2">
          <Label className="text-sm font-semibold text-gray-600 uppercase tracking-wider">
            Canal de Notificación
          </Label>
          <Select
            onValueChange={(value) =>
              form.setValue("notificationChannel", value)
            }
            defaultValue={form.watch("notificationChannel")}
          >
            <SelectTrigger className="h-12 border-gray-200 w-full">
              <SelectValue placeholder="Seleccione el medio de entrada..." />
            </SelectTrigger>
            <SelectContent>
              {notificationChannels.map((channel) => (
                <SelectItem key={channel} value={channel}>
                  <div className="flex items-center gap-2">
                    {getChannelIcon(channel)}
                    {channel}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {form.formState.errors.notificationChannel && (
            <p className="text-red-500 text-xs mt-1">
              {form.formState.errors.notificationChannel.message}
            </p>
          )}
        </div>

        {/* Organismo */}
        <div className="space-y-2">
          <Label className="text-sm font-semibold text-gray-600 uppercase tracking-wider">
            Organismo que Notifica
          </Label>
          <div className="relative">
            <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              {...form.register("notifyingOrganism")}
              className="pl-10 border-gray-200 focus:ring-jst-500"
              placeholder="Ej: Policía Federal, ANAC, etc."
            />
          </div>
          {form.formState.errors.notifyingOrganism && (
            <p className="text-red-500 text-xs mt-1">
              {form.formState.errors.notifyingOrganism.message}
            </p>
          )}
        </div>

        {/* Fecha de Notificación */}
        <div className="space-y-2">
          <Label className="text-sm font-semibold text-gray-600 uppercase tracking-wider">
            Fecha de Notificación
          </Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full h-10 justify-start text-left font-normal border-gray-200"
              >
                <Calendar className="mr-2 h-4 w-4 text-jst-500" />
                {form.watch("notificationDate")
                  ? format(form.watch("notificationDate") as Date, "PPP", {
                      locale: es,
                    })
                  : "Seleccionar fecha"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <CalendarComponent
                mode="single"
                selected={form.watch("notificationDate") as Date}
                onSelect={(date) =>
                  date && form.setValue("notificationDate", date)
                }
                initialFocus
              />
            </PopoverContent>
          </Popover>
          {form.formState.errors.notificationDate && (
            <p className="text-red-500 text-xs mt-1">
              {form.formState.errors.notificationDate.message}
            </p>
          )}
        </div>

        {/* Hora de Notificación */}
        <div className="space-y-2">
          <Label className="text-sm font-semibold text-gray-600 uppercase tracking-wider">
            Hora de Notificación
          </Label>
          <div className="relative">
            <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-jst-500" />
            <Input
              type="time"
              className="pl-10 h-10 border-gray-200 focus:ring-jst-500"
              {...form.register("notificationTime")}
            />
          </div>
          {form.formState.errors.notificationTime && (
            <p className="text-red-500 text-xs mt-1">
              {form.formState.errors.notificationTime.message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
