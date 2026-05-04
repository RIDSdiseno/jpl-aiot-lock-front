export interface CredencialesLogin {
  email: string;
  password: string;
}

export interface UsuarioSesion {
  id: string;
  name?: string | null;
  email: string;
  role?: string | null;
  companyId?: string | null;
  company?: { id: string; name: string } | null;
}

export interface RespuestaLogin {
  accessToken: string;
  user?: UsuarioSesion;
}
