/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { serverFetch } from "@/lib/server-fetch";
import { zodValidator } from "@/lib/zodValidator";
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
    // Build validation payload
    const payload = {
    name: formData.get("name") || undefined,
    phone: formData.get("phone") || undefined,
    address: formData.get("address") || undefined,
    bio: formData.get("bio") || undefined,
    languages:
      formData.get("languages")
        ?.toString()
        ?.split(",")
        .filter(Boolean) || undefined,
  };


    const validation = zodValidator(payload, tourUpdateValidation);

    if (!validation.success && validation.errors) {
        return {
            success: false,
            message: "Validation failed",
            errors: validation.errors,
            formData: payload,
        }
    }


    if (!validation.data) {
        return {
            success: false,
            message: "Validation failed",
              errors: validation.errors,
            formData: payload,
        }
    }
     const fd = new FormData();
  fd.append("data", JSON.stringify(validation.data));

  const file = formData.get("file") as File | null;
  if (file && file.size > 0) {
    fd.append("file", file);
  }
    

    try {
        const response = await serverFetch.patch(`/user/update-profile`, {
           body: fd,
        });

        const result = await response.json();
        return result;
    } catch (error: any) {
        console.error("Create Admin error:", error);
        return {
            success: false,
            message: process.env.NODE_ENV === 'development' ? error.message : 'Failed to update Profile',
            formData:  payload
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