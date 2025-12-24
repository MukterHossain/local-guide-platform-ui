/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { serverFetch } from "@/lib/server-fetch"


export async function initiatePayment(bookinId: string) {
    try {
        const res = await serverFetch.post(`/booking/${bookinId}/initiate-payment`, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        const result = await res.json();
        return result
    } catch (error: any) {
        console.error("Error initiating payment:", error);
        return {
            success: false,
            message:
                process.env.NODE_ENV === "development"
                    ? error.message
                    : "Failed to initiate payment",
        };
    }
}

export async function getPaymentStatus(bookingId: string) {
    try {
        const response = await serverFetch.get(`/payment/status/${bookingId}`);
        const result = await response.json();
        return result;
    } catch (error: any) {
        console.error("Error fetching payment status:", error);
        return {
            success: false,
            message:
                process.env.NODE_ENV === "development"
                    ? error.message
                    : "Failed to fetch payment status",
        };
    }
}