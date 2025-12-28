import TouristMetaDataCard from '@/components/modules/Meta/TouristMetaData/TouristMetaDataCard';
import { getMetaData } from '@/services/meta/metaData';

const TouristDashboardPage =async () => {
    const meta = await getMetaData()
    if(!meta.data) return <div>No Data Found</div>
    console.log("meta Data Tourist", meta)
    return (
        <div>
            <TouristMetaDataCard metaData={meta.data}></TouristMetaDataCard>
        </div>
    );
};

export default TouristDashboardPage;