/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { serverFetch } from "@/lib/server-fetch";
import { zodValidator } from "@/lib/zodValidator";
import { loginUser } from "./loginUser";
import { becomeGuideValidation} from "@/zod/user.validation";
import { redirect } from "next/navigation";



export const createBecomeGuide = async (_currentState: any, formData: any): Promise<any> => {
  try {
     const locationIds = formData.get("locationIds")?.toString().split(",").filter(Boolean) || [];

    const payload: any = {
      
      expertise: formData.get('expertise')?.toString(),
        experienceYears: Number(formData.get('experienceYears')),
        dailyRate: Number(formData.get('dailyRate')),
        locationIds: locationIds,
    };

    const validation = zodValidator(payload, becomeGuideValidation);

    if (!validation.success) {
      return validation;
    }

    // const formDataToSend = new FormData();
    // formDataToSend.append("data", JSON.stringify(payload));
    const res = await serverFetch.post("/user/become-guide", {
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json"
      }
    })
    console.log(res, "res");
    const result = await res.json()
    if (!result.success) {
      return result;  
    }
    console.log("result from server", result)
    redirect('/guide/dashboard');
    // return result;



  } catch (error: any) {
    if (error?.digest?.startsWith('NEXT_REDIRECT')) {
      throw error;
    }
    console.log(error);
    return { success: false, message: `${process.env.NODE_ENV === 'development' ? error.message : "Login Failed. You might have entered incorrect email or password."}` }
  }
}