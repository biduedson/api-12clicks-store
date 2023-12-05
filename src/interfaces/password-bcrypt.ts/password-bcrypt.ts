import { HttpResponse } from "../http/http";

export interface IpasswordCreateParams {
  password: string;
}

export interface IpasswordBcrypt {
  encrpypt(password: string): Promise<HttpResponse<string>>;
}
