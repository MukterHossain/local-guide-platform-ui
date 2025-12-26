/* eslint-disable @typescript-eslint/no-explicit-any */

const StatCard = ({ title, value, subtitle }: any) => (
  <div className="rounded-2xl bg-linear-to-r from-green-200 to-blue-200 duration-300 hover:from-blue-200 hover:to-green-200 p-5 shadow">
    <p className="text-4xl md:text-5xl text-center font-bold">{value}</p>
    <h4 className="text-sm text-center text-gray-700">{title}</h4>
    {subtitle && <p className="text-xs text-gray-400 mt-1">{subtitle}</p>}
  </div>
);

export default StatCard;