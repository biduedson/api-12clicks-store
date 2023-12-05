import { Administrators } from "@prisma/client";
import { HttpResponse } from "../http/http";

export interface IgetUserController {
  handle(): Promise<HttpResponse<Omit<Administrators, "password">[]>>;
}

export interface IgetUserRepository {
  getUsers(): Promise<Omit<Administrators, "password">[]>;
}
