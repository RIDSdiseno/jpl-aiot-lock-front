export interface RegistroAuditoria {
  id: string;
  userName?: string | null;
  action?: string | null;
  entity?: string | null;
  description?: string | null;
  ip?: string | null;
  userAgent?: string | null;
  createdAt?: string | null;
}
