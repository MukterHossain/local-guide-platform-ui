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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import { useActionState, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { IUserGuide } from "@/types/user.interface";
import { updateGuideProfile } from "@/services/admin/userManagement";

interface IGuideFormDialogProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  guide?: IUserGuide;
}

const GuideFormDialog = ({
  open,
  onClose,
  onSuccess,
  guide,
}: IGuideFormDialogProps) => {
  const formRef = useRef<HTMLFormElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const isEdit = !!guide;

  const [gender, setGender] = useState<"MALE" | "FEMALE">(
    guide?.gender || "MALE"
  );

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setSelectedFile(file || null);
  };

  const [state, handleSubmit] = useActionState(updateGuideProfile, null);

  const handleClose = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    if (selectedFile) {
      setSelectedFile(null); // Clear preview
    }
    formRef.current?.reset(); // Clear form
    onClose(); // Close dialog
  };

  console.log({ state });

//   const guideSelection = useSpecialtySelection({
//     guide,
//     isEdit,
//     open,
//   });

//   const getSpecialtyTitle = (id: string): string => {
//     return specialities?.find((s) => s.id === id)?.title || "Unknown";
//   };

  useEffect(() => {
    if (state?.success) {
      toast.success(state.message);
      if (formRef.current) {
        formRef.current.reset();
      }
      onSuccess();
      onClose();
    } else if (state && !state.success) {
      toast.error(state.message);

      if (selectedFile && fileInputRef.current) {
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(selectedFile);
        fileInputRef.current.files = dataTransfer.files;
      }
    }
  }, [state, onSuccess, onClose, selectedFile]);


  console.log("Satate", state)
    return (
        <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit Guide" : "Add Guide"}</DialogTitle>
        </DialogHeader>

        <form ref={formRef} action={handleSubmit} className="space-y-4">

          {/* Name */}
          <Field>
            <FieldLabel>Name</FieldLabel>
            <Input name="name" defaultValue={guide?.name} />
          </Field>

          {/* Phone */}
          <Field>
            <FieldLabel>Phone</FieldLabel>
            <Input name="phone" defaultValue={guide?.phone} />
          </Field>

          {/* Gender */}
          <Field>
            <FieldLabel>Gender</FieldLabel>
            <Input name="gender" type="hidden" value={gender} />

            <Select value={gender} onValueChange={(v) => setGender(v as any)}>
              <SelectTrigger>
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="MALE">Male</SelectItem>
                <SelectItem value="FEMALE">Female</SelectItem>
              </SelectContent>
            </Select>
          </Field>

          {/* Address */}
          <Field>
            <FieldLabel>Address</FieldLabel>
            <Input name="address" defaultValue={guide?.address} />
          </Field>

          {/* Bio */}
          <Field>
            <FieldLabel>Bio</FieldLabel>
            <Input name="bio" defaultValue={guide?.bio} />
          </Field>

          {/* Languages */}
          <Field>
            <FieldLabel>Languages (comma separated)</FieldLabel>
            <Input
              name="languages"
              defaultValue={guide?.languages?.join(", ")}
            />
          </Field>

          {/* Profile Section */}
          <div className="border p-4 rounded-xl space-y-4 bg-gray-50">
            <h3 className="font-semibold text-lg">Guide Profile</h3>

            <Field>
              <FieldLabel>Expertise</FieldLabel>
              <Input name="expertise" defaultValue={guide?.profile.expertise} />
            </Field>

            <Field>
              <FieldLabel>Experience Years</FieldLabel>
              <Input
                name="experienceYears"
                type="number"
                defaultValue={guide?.profile.experienceYears}
              />
            </Field>

            <Field>
              <FieldLabel>Fee Per Hour</FieldLabel>
              <Input
                name="feePerHour"
                type="number"
                defaultValue={guide?.profile.feePerHour}
              />
            </Field>

            <Field>
              <FieldLabel>Location ID</FieldLabel>
              <Input name="locationId" defaultValue={guide?.profile.locationId} />
            </Field>

            {/* <Field>
              <FieldLabel>Available Status</FieldLabel>
              <Select
                name="availableStatus"
                defaultValue={guide?.profile. ? "true" : "false"}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="true">Available</SelectItem>
                  <SelectItem value="false">Busy</SelectItem>
                </SelectContent>
              </Select>
            </Field> */}
          </div>

          {/* Image Upload */}
          <Field>
            <FieldLabel>Profile Photo</FieldLabel>

            {selectedFile ? (
              <Image
                src={URL.createObjectURL(selectedFile)}
                width={80}
                height={80}
                alt="Preview"
                className="rounded-full mb-2"
              />
            ) : guide?.image ? (
              <Image
                src={guide.image}
                width={80}
                height={80}
                alt="Guide"
                className="rounded-full mb-2"
              />
            ) : null}

            <Input type="file" name="file" accept="image/*" ref={fileInputRef} onChange={handleFileChange} />
          </Field>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t mt-4">
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit">
              {isEdit ? "Update Guide" : "Create Guide"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
    );
};

export default GuideFormDialog;