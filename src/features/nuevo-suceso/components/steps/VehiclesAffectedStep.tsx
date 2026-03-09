import { useState } from "react";
import { useFieldArray } from "react-hook-form";
import {
  Car,
  Plus,
  Ship,
  Plane,
  Train,
  Trash2,
  Layers,
  Pencil,
} from "lucide-react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectItem,
  SelectValue,
  SelectContent,
  SelectTrigger,
} from "@/components/ui/select";
import {
  Dialog,
  DialogTitle,
  DialogHeader,
  DialogFooter,
  DialogContent,
} from "@/components/ui/dialog";
import {
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
} from "@/components/ui/table";

import type { VehicleFormValues } from "../../schemas/vehicles-data";

import { vehicleTypesByMode } from "../../constants";
import { useNuevoSuceso } from "../../context/NuevoSucesoContext";

const DEFAULT_VEHICLE: VehicleFormValues = {
  id: "",
  type: "",
  matricula: "",
  fabricante: "",
  modelo: "",
  serie: "",
  dominio: "",
  linea: "",
  operador: "",
  marca: "",
  nombre: "",
};

export function VehiclesAffectedStep() {
  const { form } = useNuevoSuceso();
  const transportMode = form.watch("transportMode");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  // Estado local para el vehículo que se está editando/agregando en el Dialog
  const [currentVehicle, setCurrentVehicle] =
    useState<VehicleFormValues>(DEFAULT_VEHICLE);

  const { fields, append, remove, update } = useFieldArray({
    control: form.control,
    name: "vehicles",
  });

  const getModeIcon = () => {
    switch (transportMode) {
      case "aeronautico":
        return <Plane className="w-5 h-5" />;
      case "automotor":
        return <Car className="w-5 h-5" />;
      case "ferroviario":
        return <Train className="w-5 h-5" />;
      case "maritimo":
        return <Ship className="w-5 h-5" />;
      default:
        return <Layers className="w-5 h-5" />;
    }
  };

  const vehicleTypes =
    vehicleTypesByMode[transportMode as keyof typeof vehicleTypesByMode] || [];

  const handleOpenAdd = () => {
    setEditingIndex(null);
    setCurrentVehicle({ ...DEFAULT_VEHICLE, id: crypto.randomUUID() });
    setIsDialogOpen(true);
  };

  const editVehicle = (index: number) => {
    setEditingIndex(index);
    setCurrentVehicle({ ...fields[index] } as VehicleFormValues);
    setIsDialogOpen(true);
  };

  const handleConfirm = () => {
    if (editingIndex !== null) {
      update(editingIndex, currentVehicle);
    } else {
      append(currentVehicle);
    }
    setIsDialogOpen(false);
  };

  const updateCurrentField = (
    field: keyof VehicleFormValues,
    value: string,
  ) => {
    setCurrentVehicle((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            {getModeIcon()}
            Vehículos Involucrados
          </h3>
          <p className="text-sm text-gray-500">
            Registre los vehículos afectados en el suceso {transportMode}.
          </p>
        </div>

        <Button
          type="button"
          onClick={handleOpenAdd}
          className="bg-jst-500 hover:bg-jst-600 text-white flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Agregar Vehículo
        </Button>
      </div>

      {fields.length === 0 ? (
        <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-xl bg-gray-50">
          <p className="text-gray-500">No hay vehículos registrados aún.</p>
          <Button
            type="button"
            variant="ghost"
            onClick={handleOpenAdd}
            className="mt-2 text-jst-600 hover:text-jst-700 hover:bg-jst-50"
          >
            Agregar el primer vehículo
          </Button>
        </div>
      ) : (
        <div className="border rounded-lg overflow-hidden shadow-sm bg-white">
          <Table>
            <TableHeader className="bg-gray-50">
              <TableRow>
                <TableHead>Tipo</TableHead>
                {transportMode === "aeronautico" && (
                  <>
                    <TableHead>Matrícula</TableHead>
                    <TableHead>Fabricante / Modelo</TableHead>
                    <TableHead>Nro Serie</TableHead>
                  </>
                )}
                {transportMode === "automotor" && (
                  <>
                    <TableHead>Dominio</TableHead>
                    <TableHead>Marca / Línea</TableHead>
                    <TableHead>Operador</TableHead>
                  </>
                )}
                {transportMode !== "aeronautico" &&
                  transportMode !== "automotor" && (
                    <TableHead>Identificación</TableHead>
                  )}
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {fields.map((field, index) => {
                const v = field as unknown as VehicleFormValues;
                return (
                  <TableRow
                    key={field.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <TableCell className="font-medium whitespace-nowrap">
                      {v.type || (
                        <span className="text-gray-400 italic">
                          No especificado
                        </span>
                      )}
                    </TableCell>

                    {transportMode === "aeronautico" && (
                      <>
                        <TableCell className="font-mono">
                          {v.matricula || "-"}
                        </TableCell>
                        <TableCell>
                          {v.fabricante} {v.modelo ? `(${v.modelo})` : ""}
                        </TableCell>
                        <TableCell className="text-xs text-gray-500">
                          {v.serie || "-"}
                        </TableCell>
                      </>
                    )}

                    {transportMode === "automotor" && (
                      <>
                        <TableCell className="font-mono">
                          {v.dominio || "-"}
                        </TableCell>
                        <TableCell>
                          {v.marca || "-"} {v.linea ? `/ L: ${v.linea}` : ""}
                        </TableCell>
                        <TableCell>{v.operador || "-"}</TableCell>
                      </>
                    )}

                    {transportMode !== "aeronautico" &&
                      transportMode !== "automotor" && (
                        <TableCell>{v.nombre || "-"}</TableCell>
                      )}

                    <TableCell className="text-right whitespace-nowrap">
                      <div className="flex justify-end gap-2">
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => editVehicle(index)}
                          className="h-8 w-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                        >
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => remove(index)}
                          className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Dialog para Agregar/Editar */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-150">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {editingIndex !== null ? "Editar Vehículo" : "Nuevo Vehículo"}
              <span className="text-sm font-normal text-gray-500 uppercase">
                ({transportMode})
              </span>
            </DialogTitle>
          </DialogHeader>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
            {/* Tipo de Vehículo */}
            <div className="space-y-2 col-span-full">
              <Label className="text-xs font-semibold text-gray-500 uppercase">
                Tipo de Vehículo
              </Label>
              <Select
                value={currentVehicle.type}
                onValueChange={(value) => updateCurrentField("type", value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Seleccione tipo de vehículo..." />
                </SelectTrigger>
                <SelectContent>
                  {vehicleTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Campos específicos por modo */}
            {transportMode === "aeronautico" && (
              <>
                <div className="space-y-2">
                  <Label className="text-xs font-semibold text-gray-500 uppercase">
                    Matrícula
                  </Label>
                  <Input
                    value={currentVehicle.matricula}
                    onChange={(e) =>
                      updateCurrentField("matricula", e.target.value)
                    }
                    placeholder="Ej: LV-XYZ"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-semibold text-gray-500 uppercase">
                    Fabricante
                  </Label>
                  <Input
                    value={currentVehicle.fabricante}
                    onChange={(e) =>
                      updateCurrentField("fabricante", e.target.value)
                    }
                    placeholder="Ej: Boeing"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-semibold text-gray-500 uppercase">
                    Modelo
                  </Label>
                  <Input
                    value={currentVehicle.modelo}
                    onChange={(e) =>
                      updateCurrentField("modelo", e.target.value)
                    }
                    placeholder="Ej: 737-800"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-semibold text-gray-500 uppercase">
                    Nro de Serie
                  </Label>
                  <Input
                    value={currentVehicle.serie}
                    onChange={(e) =>
                      updateCurrentField("serie", e.target.value)
                    }
                    placeholder="Ej: 12345678"
                  />
                </div>
              </>
            )}

            {transportMode === "automotor" && (
              <>
                <div className="space-y-2">
                  <Label className="text-xs font-semibold text-gray-500 uppercase">
                    Dominio / Patente
                  </Label>
                  <Input
                    value={currentVehicle.dominio}
                    onChange={(e) =>
                      updateCurrentField("dominio", e.target.value)
                    }
                    placeholder="Ej: AA123BB"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-semibold text-gray-500 uppercase">
                    Marca
                  </Label>
                  <Input
                    value={currentVehicle.marca}
                    onChange={(e) =>
                      updateCurrentField("marca", e.target.value)
                    }
                    placeholder="Ej: Mercedes-Benz"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-semibold text-gray-500 uppercase">
                    Línea
                  </Label>
                  <Input
                    value={currentVehicle.linea}
                    onChange={(e) =>
                      updateCurrentField("linea", e.target.value)
                    }
                    placeholder="Ej: 132"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-semibold text-gray-500 uppercase">
                    Operador / Empresa
                  </Label>
                  <Input
                    value={currentVehicle.operador}
                    onChange={(e) =>
                      updateCurrentField("operador", e.target.value)
                    }
                    placeholder="Ej: Empresa S.A."
                  />
                </div>
              </>
            )}

            {/* Otros modos: genérico */}
            {transportMode !== "aeronautico" &&
              transportMode !== "automotor" && (
                <div className="space-y-2 col-span-full">
                  <Label className="text-xs font-semibold text-gray-500 uppercase">
                    Nombre / Identificación
                  </Label>
                  <Input
                    value={currentVehicle.nombre}
                    onChange={(e) =>
                      updateCurrentField("nombre", e.target.value)
                    }
                    placeholder="Identificación del vehículo"
                  />
                </div>
              )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancelar
            </Button>
            <Button
              type="button"
              onClick={handleConfirm}
              className="bg-jst-500 hover:bg-jst-600 text-white"
              disabled={!currentVehicle.type}
            >
              {editingIndex !== null ? "Actualizar" : "Confirmar"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
