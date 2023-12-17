import { Category } from "@prisma/client";
import { HttpRequest, HttpResponse } from "../http/http";

export interface IcreateCategoryController {
  handle(
    httpRequest: HttpRequest<Omit<Category, "id">>
  ): Promise<HttpResponse<Category>>;
}

export interface IsearchCategoryParams {
  name: string;
}
export interface IcreateCategoryRepository {
  searchCategoryExisting(params: IsearchCategoryParams): Promise<boolean>;
  createCategory(params: Omit<Category, "id">): Promise<Category>;
}
