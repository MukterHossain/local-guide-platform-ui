import { getTourLists } from "@/services/common/exploreTours";
import ExploreToursCard from "./ExploreToursCard";
import { ITourList } from "@/types/tourList.interface";

const ExploreTours =async () => {
    const tourLists = await getTourLists();

    console.log("bookingResult", tourLists);
    return (
        <div>
            <h1>ExploreTours</h1>
            <div className="grid grid-cols-4 gap-4">
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