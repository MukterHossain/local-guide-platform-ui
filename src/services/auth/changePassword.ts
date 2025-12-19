
/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { serverFetch } from "@/lib/server-fetch";
import { loginUser } from "./loginUser";



export const changePassword = async (_currentState: any, formData: any): Promise<any> => {
    try {
        const payload = {
            oldPassword: formData.get("oldPassword"),
            newPassword: formData.get("newPassword"),
        };

        const res = await serverFetch.post("/auth/change-password", {
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });
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

