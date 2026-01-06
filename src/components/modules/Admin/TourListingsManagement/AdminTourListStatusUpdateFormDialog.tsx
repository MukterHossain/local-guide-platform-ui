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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { updateTourListStatus } from "@/services/admin/tourListManagement";
import { ITourList } from "@/types/tourList.interface";
import { useActionState, useEffect, useRef, useState } from "react";
import { toast } from "sonner";


interface ITourListStatusUpdateDialogProps {
    open: boolean;
    onClose: () => void;
    onSuccess: () => void;
    tourLists: ITourList | null;
}
const AdminTourListStatusUpdateFormDialog = ({ open, onClose, onSuccess, tourLists }: ITourListStatusUpdateDialogProps) => {

    const formRef = useRef<HTMLFormElement>(null);;
    const isEdit = !!tourLists;
    const touristId = tourLists?.id ?? '';

    const [state, formAction, isPending] = useActionState(updateTourListStatus.bind(null, touristId), null);
    const [status, setStatus] = useState<string>(tourLists?.status || '');



    console.log({ state });


    useEffect(() => {
        if (state?.success) {
            toast.success(state.message);
            if (formRef.current) {
                formRef.current.reset();
            }
            onSuccess();
            onClose();
        }
    }, [state, onSuccess, onClose]);


    console.log("Satate", state)


    return (
        <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
            <DialogContent className="max-h-[90vh] flex flex-col p-0">
                {/* Header */}
                <DialogHeader className="px-6 pt-6 pb-4 border-b">
                    <DialogTitle className="text-lg font-semibold">
                        {isEdit && "Update Tour List Status"}
                    </DialogTitle>
                </DialogHeader>

                {/* Form */}
                <form
                    ref={formRef}
                    action={formAction}
                    className="flex flex-col flex-1 min-h-0 overflow-y-auto px-6 py-4 space-y-4"
                >
                    
                    <Field>
                        <FieldLabel>Select Status</FieldLabel>
                        <Select name="status" onValueChange={setStatus} defaultValue={tourLists?.status || ''}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select account status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="DRAFT">Draft</SelectItem>
                                <SelectItem value="BLOCKED">Blocked</SelectItem>
                                <SelectItem value="PUBLISHED">Published</SelectItem>
                            </SelectContent>
                        </Select>
                    </Field>

                    {/* Action Buttons */}
                    <div className="flex justify-end gap-2 pt-4 border-t mt-2">
                        <Button type="button" variant="outline" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isPending}>
                            {isPending ? "Updating..." : "Update Status"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default AdminTourListStatusUpdateFormDialog;