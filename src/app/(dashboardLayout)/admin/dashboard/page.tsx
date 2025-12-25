import { getMetaData } from "@/services/admin/metaData";

const DashboardPage =async () => {
    const meta = await getMetaData()
    console.log("meta Data", meta)
    return (
        <div>
            <h1>Dashboard</h1>
        </div>
    );
};

export default DashboardPage;