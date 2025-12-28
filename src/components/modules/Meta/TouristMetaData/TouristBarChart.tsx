/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { ChartConfig, ChartContainer } from "@/components/ui/chart"
import { Bar, BarChart } from "recharts"


export function TouristBarChart({barChartData}:any) {

   
  return (
    <div>
        <ChartContainer config={bookingBarChartConfig} className="min-h-[200px] w-full">
      <BarChart accessibilityLayer data={barChartData}>
        <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />12
        <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
      </BarChart>
    </ChartContainer>
    </div>
  )
}

export const bookingBarChartConfig: ChartConfig = {
  bookings: {
    label: "Bookings",
    color: "hsl(var(--primary))"
  }
};