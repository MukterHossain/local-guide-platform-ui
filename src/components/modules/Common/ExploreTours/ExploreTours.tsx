import { getTours } from "@/services/common/exploreTours";

const ExploreTours =async () => {
    const bookingResult = await getTours();

    console.log("bookingResult", bookingResult);
    return (
        <div>
            <h1>ExploreTours</h1>
        </div>
    );
};

export default ExploreTours;