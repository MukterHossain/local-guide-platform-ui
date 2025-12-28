/* eslint-disable @typescript-eslint/no-explicit-any */
import StatCard from "../MetaDataManagement/StatCard";
import { GuideBarChart } from "./GuideBarChart";
import { GuidePieChart } from "./GuidePieChart";

const GuideMetaDataCard = ({ metaData }: any) => {
    const barChartData = metaData?.barChartData?.map((item :any) => ({
        date: new Date(item.createdAt).toLocaleDateString(),
        bookings: item._count.id
    }));
    const pieChartData = metaData?.pieChartData?.map((item :any) => ({
        status: item.status,
        value: item.count,
        fill: `var(--color-${item.status.toLowerCase()})`
    }));

    return (
        <div>
            <div className="p-4">
                <h1 className="text-2xl sm:text-3xl font-bold mb-4">Data Analysis</h1>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    <StatCard title="Total Tourist" value={metaData?.touristCount}></StatCard>
                    <StatCard title="Total Booking" value={metaData?.bookingCount}></StatCard>
                    <StatCard title="Total Review" value={metaData?.reviewCount}></StatCard> <StatCard title="Average Rating" value={metaData?.avgRating ? metaData?.avgRating : 0}></StatCard>
                    <StatCard title="Total Review" value={metaData?.reviewCount}></StatCard> <StatCard title="Total Revenue" value={metaData?.totalRevenue?._sum.amount ? metaData?.totalRevenue?._sum.amount : 0}></StatCard>
                </div>
                <div className="mt-4">
                    <h1 className=" py-2 text-2xl sm:text-3xl font-bold">Analytics</h1>
                    <div className=" grid grid-cols-1 md:grid-cols-2 gap-4">
                        <GuideBarChart barChartData={barChartData}></GuideBarChart>
                        <GuidePieChart pieChartData={pieChartData}></GuidePieChart>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GuideMetaDataCard;