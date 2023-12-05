import { Administrators } from "@prisma/client";
import { HttpRequest, HttpResponse } from "../http/http";
import { IsearchExistingAdmUser } from "../search-existing-adm-user/search-existing-adm-user";

export interface IcreateAdmUserParams {
  user: string;
  email: string;
  password: string;
}

export interface IcreateAdmUserController {
  handle(
    httpRequest: HttpRequest<IcreateAdmUserParams>
  ): Promise<HttpResponse<Omit<Administrators, "password">>>;
}

export interface IcreateAdmUserRepository {
  createAdmUser(
    params: IcreateAdmUserParams
  ): Promise<Omit<Administrators, "password">>;
  searchExistingAmdUser(
    params: Omit<Administrators, "id" | "password">
  ): Promise<IsearchExistingAdmUser>;
}
