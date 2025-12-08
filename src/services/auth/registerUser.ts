/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { serverFetch } from "@/lib/server-fetch";

import { zodValidator } from "@/lib/zodValidator";
import { registerUserValidationZodSchema } from "@/zod/auth.validation";



export const registerUser = async (_currentState: any, formData: any): Promise<any> => {
    try {
         const file = formData.get("file") as Blob | null;
        // console.log(formData.get("address"));
        // const payload = {
        //     name: formData.get('name'),
        //     address: formData.get('address'),
        //     email: formData.get('email'),
        //     phone: formData.get('phone'),
        //     password: formData.get('password'),
        //     confirmPassword: formData.get('confirmPassword'),
        // }
         const role = formData.get("role");

    const basePayload: any = {
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      address: formData.get('address'),
      password: formData.get('password'),
      confirmPassword: formData.get('confirmPassword'),
      role,
    };

    // Guide হলে extra profile data যোগ করুন
    if (role === "GUIDE") {
      basePayload.profile = {
        bio: formData.get('bio'),
        languages: formData.get('languages')?.split(",").map((l:any) => l.trim()),
        experienceYears: Number(formData.get('experienceYears')),
        feePerHour: Number(formData.get('feePerHour')),
        locationId: formData.get('locationId') || null,
      };
    }

        // if (zodValidator(payload, registerUserValidationZodSchema).success === false) {
        //     return zodValidator(payload, registerUserValidationZodSchema);
        // }

        const newFormData = new FormData();
        if(file) newFormData.append("file", file);

        newFormData.append("data", JSON.stringify(basePayload));




        // if (formData.get("file")) {
        //     newFormData.append("file", formData.get("file") as Blob);
        // }

        // const res = await serverFetch.post("/user/register", {
        //     body: newFormData,
        // })
        const res = await fetch("http://localhost:5000/api/user/register", {
            method: "POST",
            body: newFormData,
        })
        console.log(res, "res");
        const result = await res.json()
        // if (result.success) {
        //     await loginUser(_currentState, formData);
        // }
        console.log("result from server", result)
        return result;



    } catch (error: any) {
        if (error?.digest?.startsWith('NEXT_REDIRECT')) {
            throw error;
        }
        console.log(error);
        return { success: false, message: `${process.env.NODE_ENV === 'development' ? error.message : "Login Failed. You might have entered incorrect email or password."}` }
    }
}