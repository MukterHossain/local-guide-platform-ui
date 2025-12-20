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
import { Input } from "@/components/ui/input";
import { createTourList, getLocationForTourList } from "@/services/guide/guideTourList";
import { useActionState, useEffect, useRef, useState } from "react";
import { toast } from "sonner";

interface ITourListFormDialogProps {
    open: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

const TourListFormDialog = ({
    open,
    onClose,
    onSuccess,
}: ITourListFormDialogProps) => {
    const formRef = useRef<HTMLFormElement>(null);
    const [state, formAction, isPending] = useActionState(createTourList, null);

    const [locations, setLocations] = useState<any[]>([]);
    useEffect(() => {
        if (state?.success) {
            toast.success(state.message || "Tour list created successfully");
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
            const res = await getLocationForTourList();
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
                    <DialogTitle>Create Tour List</DialogTitle>
                </DialogHeader>

                <form
                    ref={formRef}
                    action={formAction}
                    className="flex flex-col flex-1 min-h-0"
                >
                    <div className="flex-1 overflow-y-auto px-6 space-y-4 pb-4">
                        {/* Tile */}
                        <Field>
                            <FieldLabel htmlFor="title">Title</FieldLabel>
                            <Input
                                id="title"
                                name="title"
                                type="text"

                            />
                            <InputFieldError field="title" state={state} />
                        </Field>
                        {/* city */}
                        <Field>
  <FieldLabel htmlFor="city">City</FieldLabel>
  <select
    name="city"
    className="border text-black rounded p-2 w-full"
    defaultValue=""
  >
    <option value="" disabled>
      Select city
    </option>

    {locations.map((loc) => (
      <option key={loc.id} value={loc.city}> {/* value এ city name দিন */}
        {loc.city}
      </option>
    ))}
  </select>

  <InputFieldError field="city" state={state} />
</Field>

                        {/* durationHours */}
                        <Field>
                            <FieldLabel htmlFor="durationHours">Duration (Hours)</FieldLabel>
                            <Input
                                id="durationHours"
                                name="durationHours"
                                type="number"
                                placeholder="Enter duration in hours"
                            />
                            <InputFieldError field="durationHours" state={state} />
                        </Field>

                        {/* tourFee */}
                        <Field>
                            <FieldLabel htmlFor="tourFee">Tour Fee</FieldLabel>
                            <Input
                                id="tourFee"
                                name="tourFee"
                                type="number"
                                placeholder="Enter tour fee"
                            />
                            <InputFieldError field="tourFee" state={state} />
                        </Field>

                        {/* maxPeople */}
                        <Field>
                            <FieldLabel htmlFor="maxPeople">Max People</FieldLabel>
                            <Input
                                id="maxPeople"
                                name="maxPeople"
                                type="number"
                                placeholder="Enter max people"
                            />
                            <InputFieldError field="maxPeople" state={state} />
                        </Field>
                        {/* meetingPoint */}
                        <Field>
                            <FieldLabel htmlFor="meetingPoint">Meeting Point</FieldLabel>
                            <Input
                                id="meetingPoint"
                                name="meetingPoint"
                                type="text"
                                placeholder="Enter meeting point"
                            />
                            <InputFieldError field="meetingPoint" state={state} />
                        </Field>


                        {/* Description */}
                        <Field>
                            <FieldLabel htmlFor="description">Description</FieldLabel>
                            <Input
                                id="description"
                                name="description"
                                type="text"

                            />
                            <InputFieldError field="description" state={state} />
                        </Field>

                        {/* images */}
                        <Field>
                            <FieldLabel htmlFor="images">Images (Max 5)</FieldLabel>
                            <Input
                                id="images"
                                name="images"
                                type="file"
                                accept="image/*"
                                multiple
                                max={5}
                            />
                            <InputFieldError field="images" state={state} />
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
                            {isPending ? "Creating..." : "Create Tour List"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default TourListFormDialog;