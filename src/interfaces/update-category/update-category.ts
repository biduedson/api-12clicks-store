import { Category } from "@prisma/client";
import { HttpRequest, HttpResponse } from "../http/http";

export interface IupdateCategoryController {
  handle(httpRequest: HttpRequest<Category>): Promise<HttpResponse<Category>>;
}

export interface IsearchCategoryUpdatedParams {
  id: string;
}

export interface IupdateCategoryRepository {
  searchCategoryExisting(
    params: IsearchCategoryUpdatedParams
  ): Promise<boolean>;
  updateCategory(params: Category): Promise<Category>;
}
