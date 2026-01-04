/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { serverFetch } from "@/lib/server-fetch";
import { zodValidator } from "@/lib/zodValidator";
import { createGuideLocationSchema } from "@/zod/guideLocation.validation";


export async function createGuideLocation(_prevState: any, formData: FormData) {
    // Build validation payload
    const validationPayload = {
        locationId: formData.get("locationId") as string,
        // guideId: formData.get("guideId") as string,

    };



    const validation = zodValidator(validationPayload, createGuideLocationSchema);

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
        const response = await serverFetch.post("/guideLocation", {
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(validation.data),
        });

        const result = await response.json();
        return result;
    } catch (error: any) {
        console.error("Create guide location error:", error);
        return {
            success: false,
            message: process.env.NODE_ENV === 'development' ? error.message : 'Failed to create location',
            formData: validationPayload
        };
    }
}



export async function getLocationForGuideLocation(queryString?: string) {
    try {
        const response = await serverFetch.get(`/location${queryString ? `?${queryString}` : ""}`);
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
export async function getAllGuideLocations(queryString?: string) {
    try {
        const response = await serverFetch.get(`/location/guide-locations${queryString ? `?${queryString}` : ""}`);
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

export async function getGuideLocation(queryString?: string) {
    try {
        const response = await serverFetch.get(`/guideLocation/me${queryString ? `?${queryString}` : ""}`);
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





export async function deleteGuideLacation(id: string) {
    try {
        const response = await serverFetch.delete(`/guideLocation/${id}`)
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