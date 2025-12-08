/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import z from "zod";

const loginValidationZodSchema = z.object({

    email: z.email({
        message: "Email is required",
    }),
    password: z.string("Password is required").min(6, {
        error: "Password is required and must be at least 6 characters long",
    }).max(100, {
        error: "Password must be at most 100 characters long",
    }),
});

export const loginUser = async (_currentState: any, formData: any): Promise<any> => {
    try {
        const redirectTo = formData.get('redirect') || null;
        console.log("redirect from server", redirectTo)
        // let accessTokenObject: null | any = null;
        // let refreshTokenObject: null | any = null;

        const payload = {
            email: formData.get('email'),
            password: formData.get('password'),
        }

        // if (zodValidator(payload, loginValidationZodSchema).success === false) {
        //     return zodValidator(payload, loginValidationZodSchema)
        // }

        // const validatedPayload = zodValidator(payload, loginValidationZodSchema).data;

     const res = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
             body: JSON.stringify(payload),
            headers: {
                "Content-Type": "application/json",
            },
           
        })
    //  const res = await serverFetch.post("/auth/login", {
    //         // method: "POST",
    //         body: JSON.stringify(validatedPayload),
    //         // body: JSON.stringify(loginData),
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //     })

        const result = await res.json()
        console.log("result", result)

        return result
    } catch (error: any) {
        // Re-throw NEXT_REDIRECT errors so Next.js can handle them
        if (error?.digest?.startsWith('NEXT_REDIRECT')) {
            throw error;
        }
        console.log("validatation", error)
        console.log(error);
        return { success: false, message: `${process.env.NODE_ENV === 'development' ? error.message : "Login Failed. You might have entered incorrect email or password."}` }
    }
}