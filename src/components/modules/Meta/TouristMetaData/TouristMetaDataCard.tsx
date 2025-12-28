/* eslint-disable @typescript-eslint/no-explicit-any */

import StatCard from "../MetaDataManagement/StatCard";
import { TouristBarChart } from "./TouristBarChart";
import { TouristPieChart } from "./TouristPieChart";

const TouristMetaDataCard = ({ metaData }: any) => {
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
                    <StatCard title="Total Booking" value={metaData?.bookingCount}></StatCard>
                    <StatCard title="Total Payment" value={metaData?.paymentCount}></StatCard>
                    <StatCard title="Total Review" value={metaData?.reviewCount}></StatCard>
                    <StatCard title="Upcoming Bookings" value={metaData?.upcomingBookings}></StatCard>
                    <StatCard title="Total Spent" value={metaData?.totalSpent._sum.amount ? metaData?.totalSpent._sum.amount : 0}></StatCard>
                </div>
                <div className="mt-4">
                                    <h1 className=" py-2 text-2xl sm:text-3xl font-bold">Analytics</h1>
                                    <div className=" grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <TouristBarChart barChartData={barChartData}></TouristBarChart>
                                    <TouristPieChart pieChartData={pieChartData}></TouristPieChart>
                                </div>
                                </div>
            </div>
        </div>
    );
};

export default TouristMetaDataCard;