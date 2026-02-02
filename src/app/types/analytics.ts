export type TimeRange = "Today" | "This Week" | "This Month" | "YTD";

export interface DailyRevenue {
  date: string;
  revenue: number;
  orders: number;
}

export interface PopularItem {
  id: string;
  name: string;
  sales: number;
  revenue: number;
}

export interface LowStockItem {
  name: string;
  stock: number;
  limit: number;
}

export interface DashboardStats {
  totalRevenue: number;
  activeOrders: number;
  totalMenuOptions: number;
  revenueTrend: number;
  ordersTrend: number;
  menuTrend: number;
  avgOrderValue: number;
  avgOrderTrend: number;
  customerRetention: number;
  recentSales: DailyRevenue[];
  topItems: PopularItem[];
  lowStockItems: LowStockItem[];
}
