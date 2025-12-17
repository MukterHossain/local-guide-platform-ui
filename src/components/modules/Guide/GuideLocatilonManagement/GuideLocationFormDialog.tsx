/* eslint-disable @typescript-eslint/no-explicit-any */
import InputFieldError from "@/components/shared/InputFieldError";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldLabel } from "@/components/ui/field";
import { createGuideLocation, getLocationForGuideLocation } from "@/services/guide/guideAvailableLoacation";
import { useActionState, useEffect, useRef, useState } from "react";
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
  const [state, formAction, isPending] = useActionState(createGuideLocation, null);
  const [locations, setLocations] = useState<any[]>([]);

  useEffect(() => {
    if (state?.success) {
      toast.success(state.message || "Guide Location created successfully");
      if (formRef.current) {
        formRef.current.reset();
      }
      onSuccess();
      onClose();
    } else if (state?.message && !state.success) {
      toast.error(state.message);
    }
  }, [state, onSuccess, onClose]);


  useEffect(() => {
    async function fetchLocations() {
      const res = await getLocationForGuideLocation();
      if (res?.success) {
        setLocations(res.data);
      }
    }
    fetchLocations();
  }, []);

  const handleClose = () => {
    formRef.current?.reset();
    onClose();
  };



  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-h-[90vh] flex flex-col p-0">
        <DialogHeader className="px-6 pt-6 pb-4">
          <DialogTitle> Create Guide Location</DialogTitle>
        </DialogHeader>

        <form
          ref={formRef}
          action={formAction}
          className="flex flex-col flex-1 min-h-0"
        >
          <div className="flex-1 overflow-y-auto px-6 space-y-4 pb-4">
            {/* Location */}
            <Field>
              <FieldLabel htmlFor="locationId">Location</FieldLabel>
              <select
                name="locationId"
                className="border text-black rounded p-2 w-full"
                defaultValue=""
              >
                <option value="" disabled>
                  Select location
                </option>

                {locations.map((loc) => (
                  <option key={loc.id} value={loc.id}>
                    {loc.city}
                  </option>
                ))}
              </select>

              <InputFieldError field="locationId" state={state} />
            </Field>
            {/* Tour
            <Field>
              <FieldLabel htmlFor="guideId">Guide Id</FieldLabel>
              <select name="guideId"
                className="border rounded p-2">
                <option value=""></option>
              </select>
              <InputFieldError field="guideId" state={state} />
            </Field> */}

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
              {isPending ? "Creating..." : "Create Guide Location"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default GuideLocationFormDialog;