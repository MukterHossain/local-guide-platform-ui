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
import { createTourList, getCategoryForTourList, getLocationForTourList } from "@/services/guide/guideTourList";
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
    // const [category, setCategory] = useState<any[]>([]);
    const [categoryDialogOpen, setCategoryDialogOpen] = useState(false);
    const [categories, setCategories] = useState<{ id: string; name: string }[]>([]);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);



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
    useEffect(() => {
        async function fetchCategories() {
            const res = await getCategoryForTourList();
            if (res?.success) {
                setCategories(res.data);
            }
        }
        fetchCategories();
    }, []);

    const handleClose = () => {
        formRef.current?.reset();
        setSelectedCategories([]);
        onClose();
    };
    console.log("Create tour", state)
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
                        {/* Categories as Dialog */}
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
                                {selectedCategories.map(catId => {
                                    const cat = categories.find(c => c.id === catId);
                                    return (
                                        <span
                                            key={catId}
                                            className="px-3 py-1 rounded-full bg-muted text-sm"
                                        >
                                            {cat?.name}
                                        </span>
                                    );
                                })}
                            </div>


                            {/* Hidden input to submit form */}
                            {selectedCategories.map(id => (
                                <input key={id} type="hidden" name="categories" value={id} />
                            ))}
                            <InputFieldError field="categories" state={state} />

                            {/* Category selection Dialog */}
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
                        {/* city */}
                        <Field>
                            <FieldLabel htmlFor="city">City</FieldLabel>
                            <select
                                name="city"
                                required
                                className="border text-black rounded p-2 w-full"
                            >
                                <option value="">Select city</option>

                                {locations.map((loc) => (
                                    <option key={loc.id} value={loc.city}>
                                        {loc.city} - {loc.country}
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
                            <FieldLabel htmlFor="tourFee">Tour Fee (daily)</FieldLabel>
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
                            <textarea
                                id="description"
                                name="description"
                                rows={4}
                                className="w-full border rounded p-2"
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