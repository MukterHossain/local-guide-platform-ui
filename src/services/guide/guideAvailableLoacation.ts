/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { serverFetch } from "@/lib/server-fetch";
import { zodValidator } from "@/lib/zodValidator";
import { createGuideLocationSchema } from "@/zod/guideLocation.validation";
import { updateGuideProfileSchema, updateTouristAdminSchema } from "@/zod/user.validation";


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
export async function getTourForGuideLocation(queryString?: string) {
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
export async function getGuideLocation(queryString?: string) {
    try {
        const response = await serverFetch.get(`/guideLocation${queryString ? `?${queryString}` : ""}`);
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

export async function updateGuideProfile(_prevState: any, formData: FormData) {
    // Build validation payload
    const payload = {
        name: formData.get("name"),
        phone: formData.get("phone"),
        gender: formData.get("gender"),
        address: formData.get("address"),
        availableStatus: formData.get("availableStatus"),
        bio: formData.get("bio"),
        languages: formData.get("languages")?.toString()?.split(",") || [],
        profile: {
            expertise: formData.get("expertise"),
            experienceYears: Number(formData.get("experienceYears")),
            feePerHour: Number(formData.get("feePerHour")),
            locationId: formData.get("locationId"),
        },
    };

    const fd = new FormData();
    fd.append("data", JSON.stringify(payload));

    const selectedFile = formData.get("file") as File | null;
    if (selectedFile) {
        fd.append("file", selectedFile);
    }

    const validationPayload = {
        name: formData.get("name") as string,
        phone: formData.get("phone") as string,
        gender: formData.get("gender") as string,
        address: formData.get("address") as string,
        availableStatus: formData.get("availableStatus") as string,
        bio: formData.get("bio") as string,
        languages: formData.get("languages")?.toString()?.split(",") || [],
        profile: {
            expertise: formData.get("expertise") as string,
            experienceYears: Number(formData.get("experienceYears")) as number,
            feePerHour: Number(formData.get("feePerHour")) as number,
            locationId: formData.get("locationId") as string,
        },
        file: selectedFile,
    };




    const validation = zodValidator(validationPayload, updateGuideProfileSchema);

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
        const response = await serverFetch.patch(`/user/update-profile`, {
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(validation.data),
        });

        const result = await response.json();
        return result;
    } catch (error: any) {
        console.error("Create location error:", error);
        return {
            success: false,
            message: process.env.NODE_ENV === 'development' ? error.message : 'Failed to update Profile',
            formData: validationPayload
        };
    }
}
export async function updateUser(id: string, _prevState: any, formData: FormData) {
    // Build validation payload
    const validationPayload = {
        city: formData.get("city") as string,
        country: formData.get("country") as string,
    };



    const validation = zodValidator(validationPayload, updateTouristAdminSchema);

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
        const response = await serverFetch.patch(`/location/${id}`, {
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(validation.data),
        });

        const result = await response.json();
        return result;
    } catch (error: any) {
        console.error("Create location error:", error);
        return {
            success: false,
            message: process.env.NODE_ENV === 'development' ? error.message : 'Failed to update location',
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