/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { serverFetch } from "@/lib/server-fetch";
import { zodValidator } from "@/lib/zodValidator";
import { TourUpdatePayload } from "@/types/tourList.interface";
import { tourCreateValidation, tourUpdateValidation } from "@/zod/tourList";


export async function createTourList(_prevState: any, formData: FormData) {

    console.log("tour create server", formData)
    const categories = Array.from(formData.getAll("categories"))
        .filter(cat => !!cat)
        .map(cat => ({ categoryId: cat as string }));

    // Number fields

    const durationHours = Number(formData.get("durationHours") ?? 0);
    const tourFee = Number(formData.get("tourFee") ?? 0);
    const maxPeople = Number(formData.get("maxPeople") ?? 0);

    const validationPayload = {
        title: formData.get("title") ?? "",
        description: formData.get("description") ?? "",
        city: formData.get("city") ?? "",
        durationHours,
        tourFee,
        maxPeople,
        meetingPoint: formData.get("meetingPoint") || undefined,
        categories,
    };

    if (categories.length === 0) {
        return {
            success: false,
            message: "Select at least one category",
            formData: validationPayload,
        };
    }


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
        ...validation.data,
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
        console.log("tour create server", formData)
        console.log("tour create result server", result)
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
export async function getCategoryForTourList(queryString?: string) {
    try {
        const response = await serverFetch.get(`/category${queryString ? `?${queryString}` : ""}`);
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


    const parsedCategories = parseJSON("categories");
    const existing = parseJSON("existingImages")
    const payload: TourUpdatePayload = {
        title: formData.get("title")?.toString(),
        description: formData.get("description")?.toString(),
        city: formData.get("city")?.toString(),
        meetingPoint: formData.get("meetingPoint")?.toString(),
        durationHours: formData.get("durationHours") ? Number(formData.get("durationHours")) : undefined,
        tourFee: formData.get("tourFee") ? Number(formData.get("tourFee")) : undefined,
        maxPeople: formData.get("maxPeople") ? Number(formData.get("maxPeople")) : undefined,
        ...(Array.isArray(parsedCategories) && parsedCategories.length > 0
            ? { categories: parsedCategories }
            : {}),

    };

    const categoryIds = formData.getAll("categories") as string[];

    if (categoryIds.length > 0) {
        payload.categories = categoryIds.map(id => ({
            categoryId: id,
        }));
    }

    if (Array.isArray(existing)) {
        payload.images = existing;
    }
    // ❗ remove undefined fields
    (Object.keys(payload) as (keyof TourUpdatePayload)[]).forEach((key) => {
        if (payload[key] === undefined) {
            delete payload[key];
        }
    });

    const validation = zodValidator(payload, tourUpdateValidation);

    if (!validation.success) {
        return {
            success: false,
            message: "Validation failed",
            errors: validation.errors,
            formData: payload,
        }
    }
    if (Object.keys(payload).length === 0 && formData.getAll("images").length === 0) {
        return {
            success: false,
            message: "No changes detected",
            formData: payload
        }
    }

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