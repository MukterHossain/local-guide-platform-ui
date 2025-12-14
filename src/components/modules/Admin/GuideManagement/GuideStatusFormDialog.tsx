import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useActionState, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { IUserGuide } from "@/types/user.interface";
import { updateUserStatus } from "@/services/admin/userManagement";

interface IGuideStatusUpdateProps {
    open: boolean;
    onClose: () => void;
    onSuccess: () => void;
    guide?: IUserGuide;
}

const GuideStatusFormDialog = ({
    open,
    onClose,
    onSuccess,
    guide
}: IGuideStatusUpdateProps) => {
    const formRef = useRef<HTMLFormElement>(null);;
    const [verificationStatus, setVerificationStatus] = useState<"PENDING" | "VERIFIED" | "REJECTED">(
        (guide?.profile?.verificationStatus as "PENDING" | "VERIFIED" | "REJECTED") ?? "PENDING"
    );
    const isEdit = !!guide;




    const guideId = guide?.id ?? '';


    const [state, formAction, isPending] = useActionState(updateUserStatus.bind(null, guideId), null);



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
                    {/* Verification Status */}
                    <Field>
                        <FieldLabel>Verification Status</FieldLabel>
                        <input type="hidden" name="verificationStatus" value={verificationStatus} />
                        <Select
                            value={verificationStatus}
                            onValueChange={(value) =>
                                setVerificationStatus(value as "PENDING" | "VERIFIED" | "REJECTED")
                            }
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select verification status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="PENDING">Pending</SelectItem>
                                <SelectItem value="VERIFIED">Verified</SelectItem>
                                <SelectItem value="REJECTED">Rejected</SelectItem>
                            </SelectContent>
                        </Select>
                    </Field>

                    {/* Account Status */}
                    <Field>
                        <FieldLabel>Account Status</FieldLabel>
                        <Select name="status" defaultValue={guide?.status}>
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

                    {/* Admin Note */}
                    <Field>
                        <FieldLabel>Admin Note</FieldLabel>
                        <Input
                            name="adminNote"
                            placeholder="Reason or admin note (optional)"
                            defaultValue={guide?.profile?.adminNote ?? ""}
                        />
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

export default GuideStatusFormDialog;