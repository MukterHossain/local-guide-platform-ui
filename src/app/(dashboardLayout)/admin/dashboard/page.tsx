import MetadataCard from "@/components/modules/Admin/MetaDataManagement/MetadataCard";
import { getMetaData } from "@/services/admin/metaData";

const DashboardPage =async () => {
    const meta = await getMetaData()
    if(!meta.data) return <div>No Data Found</div>
    console.log("meta Data", meta)
    return (
        <div>
            <MetadataCard metaData={meta.data}></MetadataCard>
        </div>
    );
};

export default DashboardPage;