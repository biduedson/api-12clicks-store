export interface IAuthenticatedUser {
  id: number;
  user: string;
  email: string;
}
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
