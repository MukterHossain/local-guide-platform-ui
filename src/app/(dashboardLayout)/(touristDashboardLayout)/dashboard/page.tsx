import LogoutButton from '@/components/shared/LogoutButton';
import { getCookie } from '@/services/auth/tokenHandlers';
import React from 'react';

const TouristDashboardPage = async () => {
     const accessToken = await getCookie("accessToken");
    return (
        <div>
            
            <h1>Tourist Dashboard</h1>
        </div>
    );
};

export default TouristDashboardPage;