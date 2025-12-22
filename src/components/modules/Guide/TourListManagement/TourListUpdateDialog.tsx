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
import { updateTourList, getLocationForTourList } from "@/services/guide/guideTourList";
import { ITourList } from "@/types/tourList.interface";
import Image from "next/image";
import { useActionState, useEffect, useRef, useState } from "react";
import { toast } from "sonner";


interface ITourListUpdateDialogProps {
    open: boolean;
    onClose: () => void;
    onSuccess: () => void;
    tourLists: ITourList | null;
}

const TourListUpdateDialog = ({
    open,
    onClose,
    onSuccess,
    tourLists,
}: ITourListUpdateDialogProps) => {
    const formRef = useRef<HTMLFormElement>(null);
    const [state, formAction, isPending] = useActionState(updateTourList, null);
    const hasShownToast = useRef(false);
    const [locations, setLocations] = useState<any[]>([]);
    const [existingImages, setExistingImages] = useState<string[]>(tourLists?.images || []);
    // const [selectedCategories, setSelectedCategories] = useState<string[]>([]);


    useEffect(() => {
        if (!state) return;
        if (state?.success && !hasShownToast.current) {
            toast.success(state.message || "Tour list updated successfully");
            // if (formRef.current) {
            //     formRef.current.reset();
            // }
            hasShownToast.current = true; // Set the flag
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
        // formRef.current?.reset();
        // setExistingImages([]);
        hasShownToast.current = false; // Reset the flag
        // setExistingImages(tourLists?.images || []);
        onClose();
    };

    const removeImage = (imageUrl: string) => {
        setExistingImages(prev => prev.filter(img => img !== imageUrl));
    };

    if (!tourLists) return null;

    console.log("Tour List Update", state, isPending);
    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent className="max-h-[90vh] flex flex-col">
                <DialogHeader>
                    <DialogTitle>Update Tour</DialogTitle>
                </DialogHeader>

                <form
                    ref={formRef}
                    action={formAction}
                    className="space-y-4 overflow-y-auto flex flex-col flex-1 min-h-0"
                >
                    <div className="flex-1 overflow-y-auto px-6 space-y-4 pb-4">
                        {/* ✅ REQUIRED */}
                        <input type="hidden" name="tourId" value={tourLists.id} />

                        {/* existing images */}
                        <input
                            type="hidden"
                            name="existingImages"
                            value={JSON.stringify(existingImages)}
                        />

                        {/* categories (example empty) */}
                        <input type="hidden" name="categories" value="[]" />

                        <Field>
                            <FieldLabel>Title</FieldLabel>
                            <Input name="title" defaultValue={tourLists.title} />
                            <InputFieldError field="title" state={state} />
                        </Field>

                        <Field>
                            <FieldLabel>City</FieldLabel>
                            <Input name="city" defaultValue={tourLists.city} />
                        </Field>

                        <Field>
                            <FieldLabel>Duration (hours)</FieldLabel>
                            <Input
                                type="number"
                                name="durationHours"
                                defaultValue={tourLists.durationHours}
                            />
                        </Field>

                        <Field>
                            <FieldLabel>Tour Fee</FieldLabel>
                            <Input
                                type="number"
                                name="tourFee"
                                defaultValue={tourLists.tourFee}
                            />
                        </Field>

                        <Field>
                            <FieldLabel>Max People</FieldLabel>
                            <Input
                                type="number"
                                name="maxPeople"
                                defaultValue={tourLists.maxPeople}
                            />
                        </Field>

                        <Field>
                            <FieldLabel>Meeting Point</FieldLabel>
                            <Input
                                name="meetingPoint"
                                defaultValue={tourLists.meetingPoint}
                            />
                        </Field>

                        <Field>
                            <FieldLabel>Description</FieldLabel>
                            <textarea
                                name="description"
                                defaultValue={tourLists.description}
                                className="w-full border rounded p-2"
                            />
                        </Field>

                        {/* existing images preview */}
                        {existingImages.length > 0 && (
                            <div className="grid grid-cols-3 gap-2">
                                {existingImages.map((img) => (
                                    <div key={img} className="relative">
                                        <Image
                                            src={img}
                                            alt="tour"
                                            width={200}
                                            height={100}
                                            className="rounded object-cover"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => removeImage(img)}
                                            className="absolute top-1 right-1 bg-red-500 text-white px-2 rounded"
                                        >
                                            ✕
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}

                        <Field>
                            <FieldLabel>Add New Images</FieldLabel>
                            <Input
                                type="file"
                                name="images"
                                multiple
                                accept="image/*"
                            />
                        </Field>
                    </div>
                    <div className="flex justify-end gap-2 pt-4">
                        <Button type="button" variant="outline" onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isPending}>
                            {isPending ? "Updating..." : "Update"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default TourListUpdateDialog;