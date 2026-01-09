/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { serverFetch } from "@/lib/server-fetch";
import { IBookingFormData } from "@/types/booking.interface";

export async function createBooking(data: IBookingFormData) {
    // Build validation payload
    

    try {
        const response = await serverFetch.post("/bookings", {
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });

        const result = await response.json();
        return result;
    } catch (error: any) {
        console.error("Create booking error:", error);
        return {
            success: false,
            message: process.env.NODE_ENV === 'development' ? error.message : 'Failed to create booking',
            formData: data
        };
    }
}



export async function getMyBookings(queryString?: string) {
    try {
        const response = await serverFetch.get(`/bookings/me${queryString ? `?${queryString}` : ""}`);
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




export async function getBookingById(id: string) {
    try {
        const response = await serverFetch.get(`/bookings/${id}`)
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

export async function changeBookingStatus(
    id: string,
    status: string
) {
    try {
        const response = await serverFetch.patch(
            `/bookings/status/${id}`,
            {
                body: JSON.stringify({ status }),
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        const result = await response.json();
        return result;
    } catch (error: any) {
        console.error("Error changing booking status:", error);
        return {
            success: false,
            message:
                process.env.NODE_ENV === "development"
                    ? error.message
                    : "Failed to change booking status",
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