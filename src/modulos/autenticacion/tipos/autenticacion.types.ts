export interface CredencialesLogin {
  username: string;
  password: string;
}

export interface UsuarioSesion {
  id: string;
  name?: string | null;
  email: string;
  role?: { id: string; name: string } | string | null;
  companyId?: string | null;
  company?: { id: string; name: string } | null;
}

export interface RespuestaLogin {
  ok?: boolean;
  message?: string;
  accessToken: string;
  user?: UsuarioSesion;
}
