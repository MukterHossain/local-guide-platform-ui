"use server";
import { getDefaultDashboardRoute, isValidRedirectForRole, UserRole } from "@/lib/auth-utils";
import { verifyAccessToken } from "@/lib/jwtHanlders";
import { serverFetch } from "@/lib/server-fetch";
import { zodValidator } from "@/lib/zodValidator";
import { parse } from "cookie";
import jwt from "jsonwebtoken";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { getUserInfo } from "./getUserInfo";
import { deleteCookie, getCookie, setCookie } from "./tokenHandlers";
import { updateUserValidation } from "@/zod/user.validation";
import { UpdateUserPayload } from "@/types/user.interface";

/* eslint-disable @typescript-eslint/no-explicit-any */
export async function getMyProfile(queryString?: string) {
    try {
        const response = await serverFetch.get(`/user/me${queryString ? `?${queryString}` : ""}`);
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
export async function updateMyProfile(formData: FormData) {
    try {

        const data: any = {};
        const profile: any = {};
        const touristPreference: any = {};
        formData.forEach((value, key) => {
            if (!value || key === "file") return;
            if (["bio", "address", "gender", "expertise", "experienceYears", "dailyRate"].includes(key)
            ) {
                profile[key] = key === "experienceYears" || key === "dailyRate" ? Number(value) : value.toString();
            }
            else if (key === "languages") {
                profile.languages = value.toString().split(",").map(l => l.trim()).filter(Boolean);
            }
            else if (key === "locationIds") {
                profile.locationIds = value
                    .toString()
                    .split(",")
                    .filter(Boolean);
            }
            else if (key === "interests") {
                const arr = value
                    .toString()
                    .split(",")
                    .map(i => i.trim())
                    .filter(Boolean);

                if (arr.length > 0) {
                    touristPreference.interests = arr;
                }
            }
            else if (key === "preferredLangs") {
                touristPreference.preferredLangs = value
                    .toString()
                    .split(",")
                    .map(l => l.trim())
                    .filter(Boolean);
            }
            else if (key === "travelStyle") {
                const v = value.toString();
                if (["BUDGET", "STANDARD", "LUXURY"].includes(v)) {
                    touristPreference.travelStyle = v;
                }
            }
            else if (key === "groupSize") {
                touristPreference.groupSize = Number(value);
            }
            else if (key === "travelPace") {
                const v = value.toString();
                if (["RELAXED", "MODERATE", "FAST"].includes(v)) {
                    touristPreference.travelPace = v;
                }
            }
            else {
                data[key] = value.toString();
            }

        });

        if (Object.keys(profile).length > 0) {
            data.profile = profile;
        }
        if (Object.keys(touristPreference).length > 0) {
            data.touristPreference = touristPreference;
        }

        const uploadFormData = new FormData();
        // const selectedLocations = formData.get("locationIds")?.toString().split(",").filter(Boolean) || [];

        // profile.locationIds = selectedLocations;
        // Add the data as JSON string
        uploadFormData.append('data', JSON.stringify(data));
        // const locationIdsRaw = formData.get("locationIds")?.toString()

        // if (locationIdsRaw) {
        //     const locationIdsArray = locationIdsRaw.split(",").filter(Boolean);
        //     // Append array to FormData as JSON string
        //     formData.set("locationIds", JSON.stringify(locationIdsArray));
        // }


        // const locationIds =
        //     locationIdsRaw
        //         ? locationIdsRaw.split(",").filter(Boolean)
        //         : [];


        // Build validation payload
        // const validationPayload: UpdateUserPayload = {
        //     name: formData.get("name")?.toString(),
        //     phone: formData.get("phone")?.toString(),
        //     profile: {
        //         bio: formData.get("bio")?.toString(),
        //         address: formData.get("address")?.toString(),
        //         languages: (formData.get("languages")?.toString().split(",").map(l => l.trim()).filter(Boolean) || []),
        //         gender: formData.get("gender")?.toString() as "MALE" | "FEMALE" | undefined,
        //         expertise: formData.get("expertise")?.toString(),
        //         experienceYears: formData.get("experienceYears") ? Number(formData.get("experienceYears")) : undefined,
        //         dailyRate: formData.get("dailyRate") ? Number(formData.get("dailyRate")) : undefined,
        //         locationIds: locationIds.length > 0 ? locationIds : undefined,
        //     },
        //     touristPreference: {
        //         interests: formData.get("interests") ? formData.get("interests")?.toString().split(",").map((i) => i.trim()).filter(Boolean) : undefined,
        //         travelStyle: formData.get("travelStyle") ? formData.get("travelStyle")!.toString() as "CASUAL" | "ADVENTURE" | "LUXURY" : ("CASUAL" as "CASUAL" | "ADVENTURE" | "LUXURY"),
        //         preferredLangs: formData.get("preferredLangs") ? formData.get("preferredLangs")?.toString().split(",").map((l) => l.trim()).filter(Boolean) : undefined,
        //     }
        // };

        // const validation = zodValidator(validationPayload, updateUserValidation);

        // if (!validation.success && validation.errors) {
        //     return {
        //         success: false,
        //         message: "Validation failed",
        //         formData: validationPayload,
        //         errors: validation.errors,
        //     }
        // }
        // Add the file if it exists
        const file = formData.get('file');
        if (file && file instanceof File && file.size > 0) {
            uploadFormData.append('file', file);
        }

        const response = await serverFetch.patch(`/user/me/profile`, {
            // method: "PATCH",
            body: uploadFormData,
        });

        const result = await response.json();
        console.log("update profile", result)

        revalidateTag("user-info", { expire: 0 });
        return result;
    } catch (error: any) {
        console.log(error);
        return {
            success: false,
            message: `${process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'}`
        };
    }
}


export async function getNewAccessToken() {
    try {
        const accessToken = await getCookie("accessToken");
        const refreshToken = await getCookie("refreshToken");

        //Case 1: Both tokens are missing - user is logged out
        if (!accessToken && !refreshToken) {
            return {
                tokenRefreshed: false,
            }
        }

        // Case 2 : Access Token exist- and need to verify
        if (accessToken) {
            const verifiedToken = await verifyAccessToken(accessToken);

            if (verifiedToken.success) {
                return {
                    tokenRefreshed: false,
                }
            }
        }

        //Case 3 : refresh Token is missing- user is logged out
        if (!refreshToken) {
            return {
                tokenRefreshed: false,
            }
        }

        //Case 4: Access Token is invalid/expired- try to get a new one using refresh token
        // This is the only case we need to call the API

        // Now we know: accessToken is invalid/missing AND refreshToken exists
        // Safe to call the API
        let accessTokenObject: null | any = null;
        let refreshTokenObject: null | any = null;

        // API Call - serverFetch will skip getNewAccessToken for /auth/refresh-token endpoint
        const response = await serverFetch.post("/auth/refresh-token", {
            headers: {
                Cookie: `refreshToken=${refreshToken}`,
            },
        });

        const result = await response.json();

        console.log("access token refreshed!!");
        console.log("access token refreshed!!", result);

        const setCookieHeaders = response.headers.getSetCookie();

        if (setCookieHeaders && setCookieHeaders.length > 0) {
            setCookieHeaders.forEach((cookie: string) => {
                const parsedCookie = parse(cookie);

                if (parsedCookie['accessToken']) {
                    accessTokenObject = parsedCookie;
                }
                if (parsedCookie['refreshToken']) {
                    refreshTokenObject = parsedCookie;
                }
            })
        } else {
            throw new Error("No Set-Cookie header found");
        }

        if (!accessTokenObject) {
            throw new Error("Tokens not found in cookies");
        }

        if (!refreshTokenObject) {
            throw new Error("Tokens not found in cookies");
        }

        await deleteCookie("accessToken");
        await setCookie("accessToken", accessTokenObject.accessToken, {
            secure: true,
            httpOnly: true,
            maxAge: parseInt(accessTokenObject['Max-Age']) || 1000 * 60 * 60,
            path: accessTokenObject.Path || "/",
            sameSite: accessTokenObject['SameSite'] || "none",
        });

        await deleteCookie("refreshToken");
        await setCookie("refreshToken", refreshTokenObject.refreshToken, {
            secure: true,
            httpOnly: true,
            maxAge: parseInt(refreshTokenObject['Max-Age']) || 1000 * 60 * 60 * 24 * 90,
            path: refreshTokenObject.Path || "/",
            sameSite: refreshTokenObject['SameSite'] || "none",
        });

        if (!result.success) {
            throw new Error(result.message || "Token refresh failed");
        }


        return {
            tokenRefreshed: true,
            success: true,
            message: "Token refreshed successfully"
        };


    } catch (error: any) {
        return {
            tokenRefreshed: false,
            success: false,
            message: error?.message || "Something went wrong",
        };
    }

}