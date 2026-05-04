export interface RespuestaApi<T> {
  ok?: boolean;
  data: T;
  message?: string;
}

export interface ListaPaginada<T> {
  items: T[];
  total?: number;
  page?: number;
  limit?: number;
}
