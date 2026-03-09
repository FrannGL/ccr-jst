import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTitle,
  DialogFooter,
  DialogHeader,
  DialogContent,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";

interface ClearFormDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onClearForm: () => void;
  children: React.ReactNode;
}

export function ClearFormDialog({
  isOpen,
  onOpenChange,
  onClearForm,
  children,
}: ClearFormDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>¿Limpiar todos los datos?</DialogTitle>
          <DialogDescription>
            Esta acción eliminará todos los datos ingresados y te llevará al
            primer paso. ¿Estás seguro de que deseas continuar?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Cancelar
          </Button>
          <Button type="button" variant="destructive" onClick={onClearForm}>
            Limpiar Datos
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
