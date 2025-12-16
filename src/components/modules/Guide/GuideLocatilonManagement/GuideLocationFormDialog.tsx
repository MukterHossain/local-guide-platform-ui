import InputFieldError from "@/components/shared/InputFieldError";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { createLocation } from "@/services/admin/locationManagement";
import { useActionState, useEffect, useRef } from "react";
import { toast } from "sonner";


interface IGuideLocationFormDialogProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}
const GuideLocationFormDialog = ({
  open,
  onClose,
  onSuccess,
}: IGuideLocationFormDialogProps) => {
    const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction, isPending] = useActionState(createLocation, null);

  useEffect(() => {
    if (state?.success) {
      toast.success(state.message || "Location created successfully");
      if (formRef.current) {
        formRef.current.reset();
      }
      onSuccess();
      onClose();
    } else if (state?.message && !state.success) {
      toast.error(state.message);
    }
  }, [state, onSuccess, onClose]);

  const handleClose = () => {
    formRef.current?.reset();
    onClose();
  };
    return (
        <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-h-[90vh] flex flex-col p-0">
        <DialogHeader className="px-6 pt-6 pb-4">
          <DialogTitle>Create Location</DialogTitle>
        </DialogHeader>

        <form
          ref={formRef}
          action={formAction}
          className="flex flex-col flex-1 min-h-0"
        >
          <div className="flex-1 overflow-y-auto px-6 space-y-4 pb-4">
            {/* City */}
            <Field>
              <FieldLabel htmlFor="city">City</FieldLabel>
              <Input
                id="city"
                name="city"
                type="text"
                defaultValue={state?.formData?.city || ""}
              />
              <InputFieldError field="city" state={state} />
            </Field>

            {/* Country */}
            <Field>
              <FieldLabel htmlFor="country">Country</FieldLabel>
              <Input
                id="country"
                name="country"
                type="text"
                defaultValue={state?.formData?.country || ""}
              />
              <InputFieldError field="country" state={state} />
            </Field>

          </div>

          {/* Form Actions */}
          <div className="flex justify-end gap-2 px-6 py-4 border-t bg-gray-50">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Creating..." : "Create Location"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
    );
};

export default GuideLocationFormDialog;