import * as React from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { type DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Field, FieldLabel } from "@/components/ui/field";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface DateRangeFilterProps {
  fechaDesde: string;
  fechaHasta: string;
  onChange: (key: "fechaDesde" | "fechaHasta", value: string) => void;
}

export function DateRangeFilter({
  fechaDesde,
  fechaHasta,
  onChange,
}: DateRangeFilterProps) {
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>(
    () => {
      if (fechaDesde || fechaHasta) {
        return {
          from: fechaDesde ? new Date(fechaDesde) : undefined,
          to: fechaHasta ? new Date(fechaHasta) : undefined,
        };
      }
      return undefined;
    },
  );

  const handleDateRangeSelect = (range: DateRange | undefined) => {
    setDateRange(range);

    if (range?.from) {
      onChange("fechaDesde", range.from.toISOString().split("T")[0]);
    } else {
      onChange("fechaDesde", "");
    }

    if (range?.to) {
      onChange("fechaHasta", range.to.toISOString().split("T")[0]);
    } else {
      onChange("fechaHasta", "");
    }
  };

  const formatDateRange = () => {
    if (!dateRange?.from && !dateRange?.to) {
      return "Seleccionar rango";
    }

    if (dateRange.from && !dateRange.to) {
      return `Desde ${format(dateRange.from, "dd/MM/yyyy")}`;
    }

    if (!dateRange.from && dateRange.to) {
      return `Hasta ${format(dateRange.to, "dd/MM/yyyy")}`;
    }

    if (dateRange.from && dateRange.to) {
      return `${format(dateRange.from, "dd/MM/yyyy")} - ${format(dateRange.to, "dd/MM/yyyy")}`;
    }

    return "Seleccionar rango";
  };

  return (
    <Field>
      <FieldLabel className="text-gray-500">Rango de Fechas</FieldLabel>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-full justify-start text-left font-normal",
              !dateRange && "text-muted-foreground",
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {formatDateRange()}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="range"
            selected={dateRange}
            onSelect={handleDateRangeSelect}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </Field>
  );
}
