/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { serverFetch } from "@/lib/server-fetch";
import { zodValidator } from "@/lib/zodValidator";
import { adminUpdateGuideStatus, adminUpdateTouristStatus, updateUserValidation} from "@/zod/user.validation";






export async function getAdmin(queryString?: string) {
    try {
        const response = await serverFetch.get(`/user/me${queryString ? `?${queryString}` : ""}`);
        const result = await response.json();
        return result;
    } catch (error: any) {
        console.log(error);
        return {
            success: false,
            message: `${process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'}`
        };
    }
}
export async function getGuides(queryString?: string) {
    try {
        const response = await serverFetch.get(`/user/guides${queryString ? `?${queryString}` : ""}`);
        const result = await response.json();
        return result;
    } catch (error: any) {
        console.log(error);
        return {
            success: false,
            message: `${process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'}`
        };
    }
}
export async function getTourists(queryString?: string) {
    try {
        const response = await serverFetch.get(`/user/tourists${queryString ? `?${queryString}` : ""}`);
        const result = await response.json();
        return result;
    } catch (error: any) {
        console.log(error);
        return {
            success: false,
            message: `${process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'}`
        };
    }
}

export async function getUserById(id: string) {
    try {
        const response = await serverFetch.get(`/user/${id}`)
        const result = await response.json();
        
        return result;
    } catch (error: any) {
        console.log(error);
        return {
            success: false,
            message: `${process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'}`
        };
    }
}



export async function updateUserStatus(id: string, _prevState: any, formData: FormData) {
    // Build validation payload
    const validationPayload = {
         verificationStatus: formData.get("verificationStatus") as string,
         status: formData.get("status") as string,
         adminNote: formData.get("adminNote") as string
    };


    const validation = zodValidator(validationPayload, adminUpdateGuideStatus);

    if (!validation.success && validation.errors) {
        return {
            success: false,
            message: "Validation failed",
            formData: validationPayload,
            errors: validation.errors,
        }
    }


    if (!validation.data) {
        return {
            success: false,
            message: "Validation failed",
            formData: validationPayload,
        }
    }

    try {
        const response = await serverFetch.patch(`/user/status/${id}`, {
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(validation.data),
        });

        const result = await response.json();
        return result;
    } catch (error: any) {
        console.error("Update status error:", error);
        return {
            success: false,
            message: process.env.NODE_ENV === 'development' ? error.message : 'Failed to update status',
            formData: validationPayload
        };
    }
}
export async function updateTouristStatus(id: string, _prevState: any, formData: FormData) {
    // Build validation payload
    const validationPayload = {
        status: formData.get("status") as string,
   };


    const validation = zodValidator(validationPayload, adminUpdateTouristStatus);

    if (!validation.success && validation.errors) {
        return {
            success: false,
            message: "Validation failed",
            formData: validationPayload,
            errors: validation.errors,
        }
    }


    if (!validation.data) {
        return {
            success: false,
            message: "Validation failed",
            formData: validationPayload,
        }
    }

    try {
        const response = await serverFetch.patch(`/user/status/${id}`, {
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(validation.data),
        });

        const result = await response.json();
        return result;
    } catch (error: any) {
        console.error("Update status error:", error);
        return {
            success: false,
            message: process.env.NODE_ENV === 'development' ? error.message : 'Failed to update status',
            formData: validationPayload
        };
    }
}




export async function deleteUser(id: string) {
    try {
        const response = await serverFetch.delete(`/user/${id}`)
        const result = await response.json();
        return result;
    } catch (error: any) {
        console.log(error);
        return {
            success: false,
            message: `${process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'}`
        };
    }
}