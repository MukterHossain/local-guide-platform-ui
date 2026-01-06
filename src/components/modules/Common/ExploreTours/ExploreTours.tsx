import ExploreToursCard from "./ExploreToursCard";
import { ITourList } from "@/types/tourList.interface";

const ExploreTours =async ({ tourLists }: { tourLists: ITourList[] }) => {

    return (
        <div className="container mx-auto px-4">
            
            <div className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 gap-4">

                {
                    tourLists?.map((tourList: ITourList) => (
                        <ExploreToursCard key={tourList.id} tour={tourList}></ExploreToursCard>
                    ))
                }
            </div>
        </div>
    );
};

export default ExploreTours;