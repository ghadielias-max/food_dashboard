export interface PlatformAnalytics {
  totalRevenue: number;
  totalOrders: number;
  activeBusinesses: number;
  totalUsers: number;
  revenueByMonth: { month: string; value: number }[];
  serverHealth: "OPERATIONAL" | "DEGRADED" | "DOWN";
}

export interface PlatformSettings {
  maintenanceMode: boolean;
  allowNewRegistrations: boolean;
  platformFeePercentage: number;
  supportEmail: string;
}

export interface CreateBusinessPayload {
  businessName: string;
  type: string; // We will cast this to BusinessType in service
  address: string;
  phoneNumber: string;
  ownerName: string;
  ownerEmail: string;
}