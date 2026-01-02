/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { serverFetch } from "@/lib/server-fetch";
import { zodValidator } from "@/lib/zodValidator";
import { loginUser } from "./loginUser";
import { createUserValidation } from "@/zod/user.validation";



export const registerUser = async (_currentState: any, formData: any): Promise<any> => {
  try {
    const payload: any = {
      name: formData.get('name'),
      email: formData.get('email'),
      password: formData.get('password'),
      confirmPassword: formData.get('confirmPassword'),
    };

    // const gender = formData.get('gender');
    // if (gender) payload.gender = gender;

    const phone = formData.get('phone');
    if (phone) payload.phone = phone;

    const validation = zodValidator(payload, createUserValidation);

    if (!validation.success) {
      return validation;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("data", JSON.stringify(payload));
    const res = await serverFetch.post("/user/register", {
      body: formDataToSend
    })
    console.log(res, "res");
    const result = await res.json()
    if (result.success) {
      await loginUser(_currentState, formData);
    }
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