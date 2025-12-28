/* eslint-disable @typescript-eslint/no-explicit-any */
import { MetaBarChart } from "./MetaBarChart";
import { MetaPieChart } from "./MetaPieChart";
import StatCard from "../MetaDataManagement/StatCard";
import BookingTrendBarChart from "./BookingTrendBarChart";

const AdminMetadataCard = ({ metaData }: any) => {
    const barChartData = metaData?.barChartData?.map((item: any) => ({
        date: new Date(item.createdAt).toLocaleDateString(),
        bookings: item._count.id
    }));

    const pieChartData = metaData?.pieChartData?.map((item: any) => ({
        status: item.status,
        value: item.count,
        fill: `var(--color-${item.status.toLowerCase()})`
    }));

    const bookingTrendBarChartData = metaData?.bookingTrendBarChartData?.map((item: any) => ({
        date: new Date(item.createdAt).toLocaleDateString(),
        bookings: item._count.id
    }));

    const growth = metaData?.bookingGrowth ?? 0;
    const isPositive = growth > 0;
    const isNegative = growth < 0;

    return (
        <div>
            <div className="p-4">
                <h1 className="text-2xl sm:text-3xl font-bold mb-4">Data Analysis</h1>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    <StatCard title="Total Guide" value={metaData?.guideCount}></StatCard>
                    <StatCard title="Total Tourist" value={metaData?.touristCount}></StatCard>
                    <StatCard title="Booking Count" value={metaData?.bookingCount}></StatCard>
                    <StatCard title="Payment Count" value={metaData?.paymentCount}></StatCard>
                    <StatCard title="Pending Guide" value={metaData?.pendingGuideVerification}></StatCard>
                    <StatCard title="Unpaid Payment" value={metaData?.unpaidPayments}></StatCard>
                    <div className="rounded-2xl bg-linear-to-r from-green-200 to-blue-200 p-5 shadow">
                        <p
                            className={`text-sm font-semibold ${isPositive
                                    ? "text-green-600"
                                    : isNegative
                                        ? "text-red-500"
                                        : "text-gray-600"
                                }`}
                        >
                            {isPositive && "▲ "}
                            {isNegative && "▼ "}
                            {Math.abs(growth).toFixed(1)}%
                            {growth === 0
                                ? " No change from yesterday"
                                : " from yesterday"}
                        </p>
                    </div>

                </div>
                <div className="mt-4">
                    <h1 className=" py-2 text-2xl sm:text-3xl font-bold">Analytics</h1>
                    <div className=" grid grid-cols-1 md:grid-cols-2 gap-4">
                        <MetaBarChart barChartData={barChartData}></MetaBarChart>
                        <MetaPieChart pieChartData={pieChartData}></MetaPieChart>
                        <BookingTrendBarChart barChartData={bookingTrendBarChartData}></BookingTrendBarChart>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminMetadataCard;