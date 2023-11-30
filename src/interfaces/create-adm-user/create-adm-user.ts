import { Administrators } from "@prisma/client";
import { HttpRequest, HttpResponse } from "../http/http";
import { IsearchExistingAdmUser } from "../search-existing-adm-user/search-existing-adm-user";

export interface IcreateAdmUserParams {
  params: Omit<Administrators, "id">;
}

export interface IcreateAdmUserController {
  handle(
    httpRequest: HttpRequest<IcreateAdmUserParams>
  ): Promise<HttpResponse<IcreateAdmUserParams>>;
}

export interface IcreateAdmUserRepository {
  createAdmUser(params: IcreateAdmUserParams): Promise<IcreateAdmUserParams>;
  searchExistingAmdUser(
    user: Omit<Administrators, "id" | "password">
  ): Promise<IsearchExistingAdmUser>;
}
