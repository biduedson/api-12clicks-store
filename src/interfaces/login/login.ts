import { IloggedInUser } from "../generate-token/generate-token";
import { HttpRequest, HttpResponse } from "../http/http";

export interface IloginUserParams {
  email: string;
  password: string;
}

export interface IloginUserController {
  handle(
    httpRequest: HttpRequest<IloginUserParams>
  ): Promise<HttpResponse<IloggedInUser>>;
}

export interface iLoginUserRepository {
  createLogin(params: IloginUserParams): Promise<IloggedInUser>;
  checkEmailAndPassword(params: IloginUserParams): Promise<boolean>;
}
