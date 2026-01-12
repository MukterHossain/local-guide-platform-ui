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
import { updateTourList, getLocationForTourList, getCategoryForTourList } from "@/services/guide/guideTourList";
import { IAvailability } from "@/types/availability.interface";
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
    const [existingImages, setExistingImages] = useState<string[]>(() =>
        tourLists?.images ?? []
    );
    const [categoryDialogOpen, setCategoryDialogOpen] = useState(false);
    const [categories, setCategories] = useState<{ id: string; name: string }[]>([]);
    const [selectedCategories, setSelectedCategories] = useState<string[]>(() =>
        tourLists?.categories?.map(cat => cat.categoryId) ?? []
    );
    const [selectedCity, setSelectedCity] = useState<string>(
        tourLists?.city ?? ""
    );
    const [availabilityDialogOpen, setAvailabilityDialogOpen] = useState(false);
    const [availabilities, setAvailabilities] = useState<IAvailability[]>(tourLists?.guide?.profile?.availabilities ?? []);

    // Add new availability temp state
    const [newAvailability, setNewAvailability] = useState<{ startAt: string, endAt: string }>({ startAt: '', endAt: '' });





    useEffect(() => {
        if (!state) return;
        if (state?.success && !hasShownToast.current) {
            toast.success(state.message || "Tour list updated successfully");
            hasShownToast.current = true;
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

    useEffect(() => {
        async function fetchCategories() {
            const res = await getCategoryForTourList();
            if (res?.success) {
                setCategories(res.data);
            }
        }
        fetchCategories();
    }, []);





    const handleDialogOpenChange = (isOpen: boolean) => {
        if (!isOpen) {
            hasShownToast.current = false;
            onClose();
        }
    };

    const handleClose = () => {
        hasShownToast.current = false;
        onClose();
    };

    const removeImage = (imageUrl: string) => {
        setExistingImages(prev => prev.filter(img => img !== imageUrl));
    };

    if (!tourLists) return null;

    console.log("Tour List Update", state, isPending);

    return (
        <Dialog
            key={tourLists.id}
            open={open}
            onOpenChange={handleDialogOpenChange}
        >
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
                        <input type="hidden" name="tourId" value={tourLists.id} />

                        <input
                            type="hidden"
                            name="existingImages"
                            value={JSON.stringify(existingImages)}
                        />

                        <Field>
                            <FieldLabel>Title</FieldLabel>
                            <Input name="title" defaultValue={tourLists.title} />
                            <InputFieldError field="title" state={state} />
                        </Field>

                        <Field>
                            <div className="flex items-center justify-between mb-2">
                                <FieldLabel>Categories</FieldLabel>
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => setCategoryDialogOpen(true)}
                                >
                                    Select Categories
                                </Button>
                            </div>

                            <div className="flex gap-2 flex-wrap mb-2">
                                {selectedCategories.length === 0 && (
                                    <p className="text-sm text-gray-500">No categories selected</p>
                                )}
                                {selectedCategories.map(id => {
                                    const category = categories.find(cat => cat.id === id);
                                    return (
                                        <span
                                            key={id}
                                            className="bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded"
                                        >
                                            {category?.name}
                                        </span>
                                    )
                                })}
                            </div>

                            {selectedCategories.map(id => (
                                <input key={id} type="hidden" name="categories" value={id} />
                            ))}
                            <InputFieldError field="categories" state={state} />

                            <Dialog open={categoryDialogOpen} onOpenChange={setCategoryDialogOpen}>
                                <DialogContent className="max-h-64 overflow-y-auto">
                                    <DialogHeader>
                                        <DialogTitle>Select Categories</DialogTitle>
                                    </DialogHeader>
                                    <div className="flex flex-col gap-2 mt-2">
                                        {categories.map(cat => (
                                            <label
                                                key={cat.id}
                                                className="flex items-center gap-2"
                                            >
                                                <input
                                                    type="checkbox"
                                                    value={cat.id}
                                                    checked={selectedCategories.includes(cat.id)}
                                                    onChange={(e) => {
                                                        setSelectedCategories(prev =>
                                                            e.target.checked
                                                                ? [...prev, cat.id]
                                                                : prev.filter(id => id !== cat.id)
                                                        );
                                                    }}
                                                />
                                                {cat.name}
                                            </label>
                                        ))}
                                    </div>
                                    <div className="flex justify-end gap-2 pt-4">
                                        <Button
                                            variant="outline"
                                            onClick={() => setCategoryDialogOpen(false)}
                                        >
                                            Cancel
                                        </Button>
                                        <Button onClick={() => setCategoryDialogOpen(false)}>
                                            Save
                                        </Button>
                                    </div>
                                </DialogContent>
                            </Dialog>
                        </Field>

                        <Field>
                            <FieldLabel htmlFor="city">City</FieldLabel>
                            <select
                                name="city"
                                value={selectedCity}
                                onChange={(e) => setSelectedCity(e.target.value)}
                                className="border text-black rounded p-2 w-full"
                            >
                                <option value="">Select city</option>
                                {locations.map((loc) => (
                                    <option key={loc.id} value={loc.city}>
                                        {loc.city} - {loc.country}
                                    </option>
                                ))}
                            </select>
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
                        {/* availability (read-only) */}
                        <Field>
                            <FieldLabel>Availabilities (Not editable)</FieldLabel>
                            <div className="flex flex-col gap-2">
                                {availabilities.length === 0 && (
                                    <p className="text-gray-500 text-sm">No availabilities set</p>
                                )}
                                {availabilities.map((a) => (
                                    <div
                                        key={a.id}
                                        className="flex items-center justify-between p-2 border rounded-md bg-gray-50 cursor-default"
                                    >
                                        <span className="text-gray-800">
                                            {new Date(a.startAt).toLocaleDateString()} -{" "}
                                            {new Date(a.endAt).toLocaleDateString()}
                                        </span>
                                    </div>
                                ))}
                            </div>
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