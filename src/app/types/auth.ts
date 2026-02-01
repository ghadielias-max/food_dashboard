export type UserRole = "OWNER" | "SUPER_ADMIN";

export interface User {
  id: string;
  email: string;
  role: UserRole;
  createdAt: string;
}
