export interface Usuario {
  id: string;
  name?: string | null;
  email: string;
  companyName?: string | null;
  role?: string | null;
  status?: string | null;
  lastLoginAt?: string | null;
}
