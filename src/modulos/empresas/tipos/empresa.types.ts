export interface Empresa {
  id: string;
  name: string;
  rut?: string | null;
  email?: string | null;
  phone?: string | null;
  status?: string | null;
  usersCount?: number | null;
  devicesCount?: number | null;
}
