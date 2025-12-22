/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { serverFetch } from "@/lib/server-fetch";
import { zodValidator } from "@/lib/zodValidator";
import { TourUpdatePayload } from "@/types/tourList.interface";
import { tourCreateValidation, tourUpdateValidation } from "@/zod/tourList";


export async function createTourList(_prevState: any, formData: FormData) {
    const validationPayload = {
        title: formData.get("title") as string,
        description: formData.get("description") as string,
        city: formData.get("city") as string,
        durationHours: Number(formData.get("durationHours")), // string to number
        tourFee: Number(formData.get("tourFee")), // string to number
        maxPeople: Number(formData.get("maxPeople")), // string to number
        meetingPoint: formData.get("meetingPoint") as string,
        images: formData.getAll("images"), // file array
    };




    const validation = zodValidator(validationPayload, tourCreateValidation);

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

    const submitFormData = new FormData();

    // JSON data একটি field এ যোগ করুন
    submitFormData.append('data', JSON.stringify({
        title: validation.data.title,
        description: validation.data.description,
        city: validation.data.city,
        durationHours: validation.data.durationHours,
        tourFee: validation.data.tourFee,
        maxPeople: validation.data.maxPeople,
        meetingPoint: validation.data.meetingPoint,
    }));

    const images = formData.getAll("images");
    images.forEach((image) => {
        if (image instanceof File) {
            submitFormData.append('images', image);
        }
    });

    try {
        const response = await serverFetch.post("/listings", {
            body: submitFormData,
        });

        const result = await response.json();
        return result;
    } catch (error: any) {
        console.error("Create tour list error:", error);
        return {
            success: false,
            message: process.env.NODE_ENV === 'development' ? error.message : 'Failed to create tour list',
            formData: validationPayload
        };
    }
}



export async function getMyTourLists(queryString?: string) {
    try {
        const response = await serverFetch.get(`/listings/me${queryString ? `?${queryString}` : ""}`);
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

export async function getLocationForTourList(queryString?: string) {
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


export async function getTourListById(id: string) {
    try {
        const response = await serverFetch.get(`/listings/${id}`)
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

export async function updateTourList(_prevState: any, formData: FormData) {

    const tourId = formData.get("tourId") as string;

    if (!tourId) {
        return { success: false, message: "Tour ID missing" };
    }

    const parseJSON = (key: string) => {
        const raw = formData.get(key);
        if (!raw) return undefined;
        try {
            return JSON.parse(raw as string);
        } catch {
            return undefined;
        }
    };
    const payload: TourUpdatePayload = {
        title: formData.get("title")?.toString(),
        description: formData.get("description")?.toString(),
        city: formData.get("city")?.toString(),
        meetingPoint: formData.get("meetingPoint")?.toString(),
        durationHours: formData.get("durationHours") ? Number(formData.get("durationHours")) : undefined,
        tourFee: formData.get("tourFee") ? Number(formData.get("tourFee")) : undefined,
        maxPeople: formData.get("maxPeople") ? Number(formData.get("maxPeople")) : undefined,
        categories: parseJSON("categories"),
        // images: formData.getAll("images"),

    };
    const existing = parseJSON("existingImages") as string[] | undefined;
    if (existing && existing.length > 0) {
        payload.images = existing;
    }
    // ❗ remove undefined fields
    (Object.keys(payload) as (keyof TourUpdatePayload)[]).forEach((key) => {
        if (payload[key] === undefined) {
            delete payload[key];
        }
    });

    //   if (!Object.keys(payload).length && !formData.getAll("images").length) {
    //     return { success: false, message: "No valid fields to update" };
    //   }

    // const validation = zodValidator(payload, tourUpdateValidation);

    // if (!validation.success && validation.errors) {
    //     return {
    //         success: false,
    //         message: "Validation failed",
    //         errors: validation.errors,
    //         formData: payload,
    //     }
    // }


    // if (!validation.data) {
    //     return {
    //         success: false,
    //         message: "Validation failed",
    //         errors: validation.errors,
    //         formData: payload,
    //     }
    // }

    const fd = new FormData();
    fd.append("data", JSON.stringify(payload));

    // ✅ append images EXACT name
    const files = formData.getAll("images") as File[];
    files.forEach((file) => {
        if (file instanceof File && file.size > 0) {
            fd.append("images", file);
        }
    });

    try {
        const response = await serverFetch.patch(`/listings/${tourId}`, {
            body: fd,
        });

        const result = await response.json();
        console.log("FORM DATA KEYS:", Array.from(formData.keys()));

        return result;
    } catch (error: any) {
        console.error("Create tour list update error:", error);
        return {
            success: false,
            message: process.env.NODE_ENV === 'development' ? error.message : 'Failed to update tour list',
            formData: payload
        };
    }
}




export async function deleteTourList(id: string) {
    try {
        const response = await serverFetch.delete(`/listings/${id}`)
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