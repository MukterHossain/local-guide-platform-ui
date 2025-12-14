import AdminProfile from '@/components/modules/Admin/AdminProfile/AdminProfile';
import { queryStringFormatter } from '@/lib/formatters';
import { getAdmin } from '@/services/admin/userManagement';

const AdminProfilePage = async ({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
    const searchParamsObj = await searchParams;

    const queryString = queryStringFormatter(searchParamsObj);
    const adminResult = await getAdmin(queryString);
    console.log("admin ", adminResult)
    return (
        <div>
            <AdminProfile admin={adminResult?.data || []}></AdminProfile>
        </div>
    );
};

export default AdminProfilePage;