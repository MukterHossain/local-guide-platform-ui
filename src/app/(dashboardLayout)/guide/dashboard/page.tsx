import GuideMetaDataCard from '@/components/modules/Meta/GuideMetaData/GuideMetaDataCard';
import { getMetaData } from '@/services/meta/metaData';
import React from 'react';

const GuideDashboardPage =async () => {
    const meta = await getMetaData()
    if(!meta.data) return <div>No Data Found</div>
    console.log("meta Data", meta)
    return (
        <div>
            <GuideMetaDataCard metaData={meta.data}></GuideMetaDataCard>
         </div>
    );
};

export default GuideDashboardPage;