import LocationManagementHeader from "@/components/modules/Admin/LocationManagement/LocationManagementHeader";

const AdminsManagementPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  

  return (
    <div className="space-y-6">
      <LocationManagementHeader></LocationManagementHeader>
  <h1>Admins Management</h1>
      {/* Search, Filters */}
      
    </div>
  );
};

export default AdminsManagementPage;