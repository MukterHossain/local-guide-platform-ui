/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { serverFetch } from "@/lib/server-fetch"
import { zodValidator } from "@/lib/zodValidator";
import { tourListUpdateValidation } from "@/zod/tourList";

export async function getAllTours(queryString?: string){
    try {
        const response = await serverFetch.get(`/listings${queryString ? `?${queryString}` : ""}`);
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
export async function getTourById(id: string){
    try {
        const response = await serverFetch.get(`/listings/${id}`);
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

export async function updateTourListStatus(id: string, _prevState: any, formData: FormData) {
    // Build validation payload
    const validationPayload = {
        status: formData.get("status") as string,
   };


    const validation = zodValidator(validationPayload, tourListUpdateValidation);

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
        const response = await serverFetch.patch(`/listings/tour-status/${id}`, {
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

export async function deleteTourList(queryString?: string){
    try {
        const response = await serverFetch.delete(`/listings${queryString ? `?${queryString}` : ""}`);
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