import AdminMetadataCard from "@/components/modules/Meta/AdminMetaData/AdminMetadataCard";
import { getMetaData } from "@/services/meta/metaData";

const DashboardPage =async () => {
    const meta = await getMetaData()
    if(!meta.data) return <div>No Data Found</div>
    console.log("meta Data", meta)
    return (
        <div>
            <AdminMetadataCard metaData={meta.data}></AdminMetadataCard>

        </div>
    );
};

export default DashboardPage;