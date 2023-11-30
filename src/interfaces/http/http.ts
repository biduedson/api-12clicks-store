import { IAuthenticatedUser } from "../autenticated-adm-user/autenticated-adm-user";

export interface HttpResponse<T> {
  statusCode: number;
  body: T | string;
}

export interface HttpRequest<B> {
  params?: any;
  header?: any;
  user?: IAuthenticatedUser;
  body?: B;
}
