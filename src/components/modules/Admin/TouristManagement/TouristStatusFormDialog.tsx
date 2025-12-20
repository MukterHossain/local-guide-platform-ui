import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldLabel } from "@/components/ui/field";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useActionState, useEffect, useRef} from "react";
import { toast } from "sonner";
import {UserInfo } from "@/types/user.interface";
import { updateTouristStatus } from "@/services/admin/userManagement";

interface ITouristStatusUpdateProps {
    open: boolean;
    onClose: () => void;
    onSuccess: () => void;
    tourist?: UserInfo;
}
const TouristStatusFormDialog = ({
    open,
    onClose,
    onSuccess,
    tourist
}: ITouristStatusUpdateProps) => {
    const formRef = useRef<HTMLFormElement>(null);;
    // const [status, setStatus] = useState<"PENDING" | "VERIFIED" | "REJECTED">() ;
    const isEdit = !!tourist;




    const touristId = tourist?.id ?? '';


    const [state, formAction, isPending] = useActionState(updateTouristStatus.bind(null, touristId), null);



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
                        {isEdit ? "Update Guide Status" : "Add Guide Status"}
                    </DialogTitle>
                </DialogHeader>

                {/* Form */}
                <form
                    ref={formRef}
                    action={formAction}
                    className="flex flex-col flex-1 min-h-0 overflow-y-auto px-6 py-4 space-y-4"
                >
                   

                    {/* Account Status */}
                    <Field>
                        <FieldLabel>Account Status</FieldLabel>
                        <Select name="status" defaultValue={tourist?.status}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select account status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="ACTIVE">Active</SelectItem>
                                <SelectItem value="BLOCKED">Blocked</SelectItem>
                                <SelectItem value="DELETED">Deleted</SelectItem>
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

export default TouristStatusFormDialog;