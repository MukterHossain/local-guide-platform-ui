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

    const [locations, setLocations] = useState<any[]>([]);
    const [existingImages, setExistingImages] = useState<string[]>(tourLists?.images || []);

    useEffect(() => {
        if (state?.success) {
            toast.success(state.message || "Tour list updated successfully");
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
        setExistingImages([]);
        onClose();
    };

    const handleRemoveImage = (imageUrl: string) => {
        setExistingImages(prev => prev.filter(img => img !== imageUrl));
    };

    if (!tourLists) return null;

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent className="max-h-[90vh] flex flex-col p-0">
                <DialogHeader className="px-6 pt-6 pb-4">
                    <DialogTitle>Update Tour List</DialogTitle>
                </DialogHeader>

                <form
                    ref={formRef}
                    action={formAction}
                    className="flex flex-col flex-1 min-h-0"
                >
                    {/* Hidden field for tour ID */}
                    <input type="hidden" name="tourId" value={tourLists.id} />
                    
                    {/* Hidden field for existing images */}
                    <input 
                        type="hidden" 
                        name="existingImages" 
                        value={JSON.stringify(existingImages)} 
                    />

                    <div className="flex-1 overflow-y-auto px-6 space-y-4 pb-4">
                        {/* Title */}
                        <Field>
                            <FieldLabel htmlFor="title">Title</FieldLabel>
                            <Input
                                id="title"
                                name="title"
                                type="text"
                                defaultValue={tourLists.title}
                            />
                            <InputFieldError field="title" state={state} />
                        </Field>

                        {/* City */}
                        <Field>
                            <FieldLabel htmlFor="city">City</FieldLabel>
                            <select
                                name="city"
                                className="border text-black rounded p-2 w-full"
                                defaultValue={tourLists.city}
                            >
                                <option value="" disabled>
                                    Select city
                                </option>

                                {locations.map((loc) => (
                                    <option key={loc.id} value={loc.city}>
                                        {loc.city}
                                    </option>
                                ))}
                            </select>
                            <InputFieldError field="city" state={state} />
                        </Field>

                        {/* Duration Hours */}
                        <Field>
                            <FieldLabel htmlFor="durationHours">Duration (Hours)</FieldLabel>
                            <Input
                                id="durationHours"
                                name="durationHours"
                                type="number"
                                placeholder="Enter duration in hours"
                                defaultValue={tourLists.durationHours}
                            />
                            <InputFieldError field="durationHours" state={state} />
                        </Field>

                        {/* Tour Fee */}
                        <Field>
                            <FieldLabel htmlFor="tourFee">Tour Fee</FieldLabel>
                            <Input
                                id="tourFee"
                                name="tourFee"
                                type="number"
                                placeholder="Enter tour fee"
                                defaultValue={tourLists.tourFee}
                            />
                            <InputFieldError field="tourFee" state={state} />
                        </Field>

                        {/* Max People */}
                        <Field>
                            <FieldLabel htmlFor="maxPeople">Max People</FieldLabel>
                            <Input
                                id="maxPeople"
                                name="maxPeople"
                                type="number"
                                placeholder="Enter max people"
                                defaultValue={tourLists.maxPeople}
                            />
                            <InputFieldError field="maxPeople" state={state} />
                        </Field>

                        {/* Meeting Point */}
                        <Field>
                            <FieldLabel htmlFor="meetingPoint">Meeting Point</FieldLabel>
                            <Input
                                id="meetingPoint"
                                name="meetingPoint"
                                type="text"
                                placeholder="Enter meeting point"
                                defaultValue={tourLists.meetingPoint}
                            />
                            <InputFieldError field="meetingPoint" state={state} />
                        </Field>

                        {/* Description */}
                        <Field>
                            <FieldLabel htmlFor="description">Description</FieldLabel>
                            <textarea
                                id="description"
                                name="description"
                                className="w-full border rounded p-2 min-h-[100px]"
                                placeholder="Enter tour description"
                                defaultValue={tourLists.description}
                            />
                            <InputFieldError field="description" state={state} />
                        </Field>

                        {/* Existing Images */}
                        {existingImages.length > 0 && (
                            <Field>
                                <FieldLabel>Existing Images</FieldLabel>
                                <div className="grid grid-cols-3 gap-2 mt-2">
                                    {existingImages.map((imageUrl, index) => (
                                        <div key={index} className="relative group">
                                            <Image
                                                src={imageUrl}
                                                alt={`Tour image ${index + 1}`}
                                                className="w-full h-24 object-cover rounded border"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveImage(imageUrl)}
                                                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="h-4 w-4"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </Field>
                        )}

                        {/* New Images */}
                        <Field>
                            <FieldLabel htmlFor="images">
                                Add New Images (Max {5 - existingImages.length})
                            </FieldLabel>
                            <Input
                                id="images"
                                name="images"
                                type="file"
                                accept="image/*"
                                multiple
                                max={5 - existingImages.length}
                                disabled={existingImages.length >= 5}
                            />
                            <p className="text-sm text-gray-500 mt-1">
                                {existingImages.length >= 5
                                    ? "Maximum images reached. Remove existing images to add new ones."
                                    : `You can add ${5 - existingImages.length} more image(s).`}
                            </p>
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
                            {isPending ? "Updating..." : "Update Tour List"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default TourListUpdateDialog;