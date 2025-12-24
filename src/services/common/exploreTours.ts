/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { serverFetch } from "@/lib/server-fetch";
import { zodValidator } from "@/lib/zodValidator";
import { createAvailabilitySchema } from "@/zod/availability.validation";


// export async function createBooking(_prevState: any, formData: FormData) {
//     // Build validation payload
//     const validationPayload = {
//         startAt: formData.get("startAt") as string,
//         endAt: formData.get("endAt") as string
//     };



//     const validation = zodValidator(validationPayload, createAvailabilitySchema);

//     if (!validation.success && validation.errors) {
//         return {
//             success: false,
//             message: "Validation failed",
//             formData: validationPayload,
//             errors: validation.errors,
//         }
//     }


//     if (!validation.data) {
//         return {
//             success: false,
//             message: "Validation failed",
//             formData: validationPayload,
//         }
//     }

//     try {
//         const response = await serverFetch.post("/bookings", {
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify(validation.data),
//         });

//         const result = await response.json();
//         return result;
//     } catch (error: any) {
//         console.error("Create availability error:", error);
//         return {
//             success: false,
//             message: process.env.NODE_ENV === 'development' ? error.message : 'Failed to create availability',
//             formData: validationPayload
//         };
//     }
// }



export async function getTourLists(queryString?: string) {
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

export async function getTourListById(id: string) {
    try {
        const response = await serverFetch.get(`/listings/public/${id}`)
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





export async function deleteBooking(id: string) {
    try {
        const response = await serverFetch.delete(`/bookings/${id}`)
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