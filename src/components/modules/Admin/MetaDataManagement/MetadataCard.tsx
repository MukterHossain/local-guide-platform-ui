/* eslint-disable @typescript-eslint/no-explicit-any */
import { MetaBarChart } from "./MetaBarChart";
import { MetaPieChart } from "./MetaPieChart";
import StatCard from "./StatCard";

const MetadataCard = ({ metaData }: any) => {
     const barChartData = metaData?.barChartData.map((item:any)=> ({
  date: new Date(item.createdAt).toLocaleDateString(),
  bookings: item._count.id
}));

const pieChartData = metaData?.pieChartData.map((item :any) => ({
  status: item.status,
  value: item.count,
  fill: `var(--color-${item.status.toLowerCase()})`
}));
    return (
        <div>
            <div className="p-4">
                <h1 className="text-2xl sm:text-3xl font-bold mb-4">Data Analysis</h1>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    <StatCard title="Total Guide" value={metaData?.guideCount}></StatCard>
                    <StatCard title="Total Tourist" value={metaData?.touristCount}></StatCard>
                    <StatCard title="Booking Count" value={metaData?.bookingtCount}></StatCard>
                    <StatCard title="Payment Count" value={metaData?.paymentCount}></StatCard>
                    <StatCard title="Pending Guide" value={metaData?.pendingGuideVerification}></StatCard>
                    <StatCard title="Booking Trend" value={metaData?.bookingTrend.map((item: any) => item.count)}></StatCard>
                    <div className="rounded-2xl bg-linear-to-r from-green-200 to-blue-200 duration-300 hover:from-blue-200 hover:to-green-200 p-5 shadow">
                        <p className={`text-sm font-semibold ${metaData.bookingGrowth > 0 ? "text-green-600" : "text-red-500"
                            }`}>  {metaData.bookingGrowth}% from yesterday</p>
                        {/* <h4 className="text-sm text-center text-gray-700">Booking Growth</h4> */}
                    </div>

                </div>
                <div className="mt-4">
                    <h1 className=" py-2 text-2xl sm:text-3xl font-bold">Analytics</h1>
                    <div className=" grid grid-cols-1 md:grid-cols-2 gap-4">
                    <MetaBarChart barChartData={barChartData}></MetaBarChart>
                    <MetaPieChart pieChartData={pieChartData}></MetaPieChart>
                </div>
                </div>
            </div>
        </div>
    );
};

export default MetadataCard;