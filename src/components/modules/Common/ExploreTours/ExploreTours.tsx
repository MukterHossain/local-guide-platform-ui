import { getTourLists } from "@/services/common/exploreTours";
import ExploreToursCard from "./ExploreToursCard";
import { ITourList } from "@/types/tourList.interface";

const ExploreTours =async () => {
    const tourLists = await getTourLists();

    console.log("bookingResult", tourLists);
    return (
        <div className="container mx-auto px-4">
            <h1 className="text-2xl font-bold mb-4 text-center">ExploreTours</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 gap-4">
                {
                    tourLists?.data.map((tourList: ITourList) => (
                        <ExploreToursCard key={tourList.id} tour={tourList}></ExploreToursCard>
                    ))
                }
            </div>
        </div>
    );
};

export default ExploreTours;