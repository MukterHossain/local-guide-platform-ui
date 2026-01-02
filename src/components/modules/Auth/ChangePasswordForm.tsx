/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import InputFieldError from "@/components/shared/InputFieldError";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { changePassword } from "@/services/auth/changePassword";
import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";
const ChangePasswordForm = ({ redirect }: { redirect?: string }) => {
  const [state, formAction, isPending] = useActionState(changePassword, null);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);


  useEffect(() => {
    if (state?.success) {
      toast.success("Password changed successfully.");
    }
    if (state && !state.success && state.message) {
      toast.error(state.message || "Change password failed. Please try again.");
    }
  }, [state]);
  console.log("changePassword", state)

  return (
    <form action={formAction}>
      {redirect && <Input type="hidden" name="redirect" value={redirect} />}
      <FieldGroup>
        <div className="grid grid-cols-1 gap-4">
          {/* Old Password */}
          <Field>
            <FieldLabel htmlFor="oldPassword">Old Password</FieldLabel>

            <div className="relative">
              <Input
                id="oldPassword"
                name="oldPassword"
                type={showOldPassword ? "text" : "password"}
                placeholder="Enter old password"
                autoComplete="current-password"
                className="pr-10"
              />

              <button
                type="button"
                onClick={() => setShowOldPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showOldPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <InputFieldError field="oldPassword" state={state as any} />
          </Field>
          {/* New Password */}
          <Field>
            <FieldLabel htmlFor="newPassword">New Password</FieldLabel>

            <div className="relative">
              <Input
                id="newPassword"
                name="newPassword"
                type={showNewPassword ? "text" : "password"}
                placeholder="Enter new password"
                autoComplete="new-password"
                className="pr-10"
              />

              <button
                type="button"
                onClick={() => setShowNewPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <InputFieldError field="newPassword" state={state as any} />
          </Field>


        </div>

        <FieldGroup className="mt-4">
          <Field>
            <Button type="submit" disabled={isPending} className="w-full">
              {isPending ? "Changing..." : "Change Password"}
            </Button>


          </Field>
        </FieldGroup>
      </FieldGroup>
    </form>
  );
};

export default ChangePasswordForm;