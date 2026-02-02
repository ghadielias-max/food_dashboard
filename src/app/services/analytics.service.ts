import { DashboardStats, TimeRange, DailyRevenue } from "@/app/types/analytics";

const generateHistory = (): DailyRevenue[] => {
  const history: DailyRevenue[] = [];
  const today = new Date();

  for (let i = 365; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);

    const isWeekend = date.getDay() === 0 || date.getDay() === 6;
    const baseRevenue = isWeekend ? 6000 : 3000;
    const randomVar = Math.random() * 2000;

    history.push({
      date: date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
      revenue: Math.floor(baseRevenue + randomVar),
      orders: Math.floor((baseRevenue + randomVar) / 35),
    });
  }
  return history;
};

const FULL_HISTORY = generateHistory();

const MOCK_BASE_STATS: Omit<DashboardStats, "recentSales"> = {
  totalRevenue: 45231.89,
  activeOrders: 573,
  totalMenuOptions: 89,
  revenueTrend: 20.1,
  ordersTrend: 12.5,
  menuTrend: 4,
  avgOrderValue: 32.5,
  avgOrderTrend: 2.4,
  customerRetention: 15,
  topItems: [
    { id: "1", name: "Spicy Ramen", sales: 145, revenue: 2175 },
    { id: "2", name: "Gyoza Platter", sales: 98, revenue: 1470 },
    { id: "3", name: "Matcha Latte", sales: 76, revenue: 456 },
    { id: "4", name: "Salmon Roll", sales: 65, revenue: 877 },
  ],
  lowStockItems: [
    { name: "Sriracha Sauce", stock: 2, limit: 10 },
    { name: "Napkins Pack", stock: 5, limit: 50 },
    { name: "Takeout Boxes", stock: 12, limit: 100 },
  ],
};

export const AnalyticsService = {
  getDashboardStats: async (range: TimeRange): Promise<DashboardStats> => {
    await new Promise((resolve) => setTimeout(resolve, 600));

    let daysToTake = 7;
    if (range === "Today") daysToTake = 1;
    if (range === "This Month") daysToTake = 30;
    if (range === "YTD") daysToTake = 365;

    const filteredSales = FULL_HISTORY.slice(-daysToTake);

    const totalRev = filteredSales.reduce((acc, curr) => acc + curr.revenue, 0);

    return {
      ...MOCK_BASE_STATS,
      totalRevenue: totalRev,
      recentSales: filteredSales,
    };
  },
};
