const TOKEN_KEY = "accessToken";

export const almacenamiento = {
  obtenerToken: () => localStorage.getItem(TOKEN_KEY),
  guardarToken: (token: string) => localStorage.setItem(TOKEN_KEY, token),
  borrarToken: () => localStorage.removeItem(TOKEN_KEY),
};
