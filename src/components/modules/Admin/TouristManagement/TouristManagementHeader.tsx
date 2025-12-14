import TouristFilter from "./TouristFilter";

const TouristManagementHeader = () => {
    return (
        <div>
            <div className="mb-2">
                <h1 className="text-3xl font-bold">Guide Management</h1>
                <p className="text-muted-foreground mt-1">Manage your guides</p>
            </div>
            <TouristFilter/>
        </div>
    );
};

export default TouristManagementHeader;