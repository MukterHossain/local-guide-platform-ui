// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use server"

// import { serverFetch } from "@/lib/server-fetch";
// import { zodValidator } from "@/lib/zodValidator";







// export async function getGuide(queryString?: string) {
//     try {
//         const response = await serverFetch.get(`/user/me${queryString ? `?${queryString}` : ""}`);
//         const result = await response.json();
//         return result;
//     } catch (error: any) {
//         console.log(error);
//         return {
//             success: false,
//             message: `${process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'}`
//         };
//     }
// }

// export async function getUserById(id: string) {
//     try {
//         const response = await serverFetch.get(`/user/${id}`)
//         const result = await response.json();
        
//         return result;
//     } catch (error: any) {
//         console.log(error);
//         return {
//             success: false,
//             message: `${process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'}`
//         };
//     }
// }

// export async function updateGuideProfile(_prevState: any, formData: FormData) {
//     // Build validation payload
//         const toBoolean = (value: FormDataEntryValue | null) => {
//       if (value === null) return undefined;
//       return value === "true";
//     };
//     const validationPayload  = {
//   name: formData.get("name")?.toString(),
//   phone: formData.get("phone")?.toString(),
//   gender: formData.get("gender")?.toString(),
//   address: formData.get("address")?.toString(),
//   bio: formData.get("bio")?.toString(),
//   languages: formData.get("languages")
//     ? formData.get("languages")!.toString().split(",")
//     : undefined,

//   profile: {
//     expertise: formData.get("expertise")?.toString(),
//     experienceYears: formData.get("experienceYears")
//       ? Number(formData.get("experienceYears"))
//       : undefined,
//     feePerHour: formData.get("feePerHour")
//       ? Number(formData.get("feePerHour"))
//       : undefined,
//     availableStatus: toBoolean(formData.get("availableStatus")),
//     locationId: formData.get("locationId")?.toString(),
//   },
// };

//     const fd = new FormData();
//     fd.append("data", JSON.stringify(validationPayload ));

//     const selectedFile = formData.get("file") as File | null;
//     if (selectedFile) {
//       fd.append("file", selectedFile);
//     }

  



//     const validation = zodValidator(validationPayload, "guideProfileUpdate");

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
//         const response = await serverFetch.patch(`/user/update-profile`, {
//             body: fd
//         });

//         const result = await response.json();
//         return result;
//     } catch (error: any) {
//         console.error("Create location error:", error);
//         return {
//             success: false,
//             message: process.env.NODE_ENV === 'development' ? error.message : 'Failed to update Profile',
//             formData: validationPayload
//         };
//     }
// }





// export async function deleteUser(id: string) {
//     try {
//         const response = await serverFetch.delete(`/user/${id}`)
//         const result = await response.json();
//         return result;
//     } catch (error: any) {
//         console.log(error);
//         return {
//             success: false,
//             message: `${process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'}`
//         };
//     }
// }