export type UserRole = "OWNER" | "SUPER_ADMIN";

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  businessId?: string; 
  createdAt: string;
}