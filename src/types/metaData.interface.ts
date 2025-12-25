export interface IAdminDashboard {
  guideCount: number
  touristCount: number
  bookingtCount: number
  paymentCount: number
  bookingGrowth: number
  pendingGuideVerification: number
  totalRevenue: {
    _sum: { amount: number | null }
  }
  barChartData: { createdAt: string; _count: { id: number } }[]
  pieChartData: { status: string; count: number }[]
}