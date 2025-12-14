"use client";

import { useActionState, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field";
import { toast } from "sonner";
import InputFieldError from "@/components/shared/InputFieldError";
import { registerUser } from "@/services/auth/registerUser";


const RegisterForm = () => {
  const [state, formAction, isPending] = useActionState(registerUser, null);
  const [role, setRole] = useState("TOURIST");
  const [gender, setGender] = useState("MALE");
  console.log(state, "state");

  useEffect(() => {
    if (state && !state.success && state.message) {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <form action={formAction} >
      <FieldGroup>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Name */}
          <Field>
            <FieldLabel htmlFor="name">Full Name</FieldLabel>
            <Input id="name" name="name" type="text" placeholder="John Doe" />
            <InputFieldError field="name" state={state} />
          </Field>

          {/* Email */}
          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="m@example.com"
            />
            <InputFieldError field="email" state={state} />
          </Field>
          {/* Address */}
          <Field>
            <FieldLabel htmlFor="address">Address</FieldLabel>
            <Input
              id="address"
              name="address"
              type="text"
              placeholder="123 Main St"
            />
            <InputFieldError field="address" state={state} />
          </Field>
          {/* phone */}
          <Field>
            <FieldLabel htmlFor="role">Role</FieldLabel>
            <select name="role"
              className="border rounded p-2"
              value={role}
              onChange={(e) => setRole(e.target.value)}>
              <option value="TOURIST">Tourist</option>
              <option value="GUIDE">Guide</option>
            </select>
            <InputFieldError field="role" state={state} />
          </Field>
          {/* Gender */}
          <Field>
            <FieldLabel htmlFor="gender">Gender</FieldLabel>
            <select name="gender"
              className="border rounded p-2"
              value={gender}
              onChange={(e) => setGender(e.target.value)}>
              <option value="MALE">Male</option>
              <option value="FEMALE">Female</option>
            </select>
            <InputFieldError field="gender" state={state} />
          </Field>
          <Field>
            <FieldLabel>Languages (comma separated)</FieldLabel>
            <Input name="languages" placeholder="English,Bangla" />

          </Field>
          <InputFieldError field="languages" state={state} />
          <Field>
            <FieldLabel>Bio</FieldLabel>
            <Input name="bio" />
            <InputFieldError field="bio" state={state} />

          </Field>
          {role === "GUIDE" && (
            <>
            <Field>
                <FieldLabel>expertise </FieldLabel>
                <Input type="text" name="expertise" />
                <InputFieldError field="expertise" state={state} />
              </Field>

              <Field>
                <FieldLabel>Experience (Years)</FieldLabel>
                <Input type="number" name="experienceYears" />
                <InputFieldError field="experienceYears" state={state} />
              </Field>              

              <Field>
                <FieldLabel>Fee Per Hour</FieldLabel>
                <Input type="number" name="feePerHour" />
                <InputFieldError field="feePerHour" state={state} />
              </Field>
            </>
          )}
          {/* phone */}
          <Field>
            <FieldLabel htmlFor="phone">Phone</FieldLabel>
            <Input
              id="phone"
              name="phone"
              type="tel"
              placeholder="880***********"
            />
            <InputFieldError field="phone" state={state} />
          </Field>
          {/* Password */}
          <Field>
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <Input id="password" name="password" type="password" />


            <InputFieldError field="password" state={state} />
          </Field>
          {/* Confirm Password */}
          <Field className="md:col-span-2">
            <FieldLabel htmlFor="confirmPassword">Confirm Password</FieldLabel>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
            />


            <InputFieldError field="confirmPassword" state={state} />
          </Field>
        </div>
        <FieldGroup className="mt-4">
          <Field>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Creating Account..." : "Create Account"}
            </Button>

            <FieldDescription className="px-6 text-center">
              Already have an account?{" "}
              <a href="/login" className="text-blue-600 hover:underline">
                Sign in
              </a>
            </FieldDescription>
          </Field>
        </FieldGroup>
      </FieldGroup>
    </form>
  );
};

export default RegisterForm;