"use client";

import GuideFilter from "./GuideFilter";

const GuideManagementHeader = () => {
    return (
        <div>
            <div className="mb-2">
                <h1 className="text-3xl font-bold">Guide Management</h1>
                <p className="text-muted-foreground mt-1">Manage your guides</p>
            </div>
            <GuideFilter></GuideFilter>
        </div>
    );
};

export default GuideManagementHeader;