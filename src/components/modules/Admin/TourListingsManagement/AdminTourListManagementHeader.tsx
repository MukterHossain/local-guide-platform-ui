import AdminTouristListFilter from "./AdminTourListFilter";

const AdminTouristListManagementHeader = () => {
    return (
        <div>
            <div className="mb-2">
                <h1 className="text-2xl sm:text-3xl font-bold">Tour List Management</h1>
                <p className="text-muted-foreground mt-1">Manage your tour listings</p>
            </div>
            <AdminTouristListFilter></AdminTouristListFilter>
        </div>
    );
};

export default AdminTouristListManagementHeader;