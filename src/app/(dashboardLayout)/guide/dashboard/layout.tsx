import React from 'react';

const GuideDashboardLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            <div>{children}</div>
        </div>
    );
};

export default GuideDashboardLayout;