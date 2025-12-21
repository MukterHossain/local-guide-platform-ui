import ExploreToursDetails from '@/components/modules/Common/ExploreTours/ExploreToursDetails';
import { getTourListById } from '@/services/guide/guideTourList';

const ExploreTourDetails = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const tourData = await getTourListById(id) ;
  if(!tourData?.data){
    return <div>Tour not found</div>
  }
  console.log("Explor Details", tourData)
    return (
        <div>
            <ExploreToursDetails tourData={tourData.data} />
        </div>
    );
};

export default ExploreTourDetails;