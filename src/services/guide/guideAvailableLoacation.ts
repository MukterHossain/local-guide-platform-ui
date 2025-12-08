/* eslint-disable @typescript-eslint/no-explicit-any */



export async function getAvailableLocation() {
    try {
        const response = await fetch(`http://localhost:5000/api/location`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },

        });
        const result = await response.json();
        console.log("get Available Location", result)
        return result;
    } catch (error: any) {
        console.log(error);
        return {
            success: false,
            message: `${process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'}`
        };
    }
}