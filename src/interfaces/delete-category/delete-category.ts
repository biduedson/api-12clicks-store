import { Category } from "@prisma/client";
import { HttpRequest, HttpResponse } from "../http/http";

export interface IdeleteCategoryController {
  handle(
    httpResquest: HttpRequest<{ params: IdeleteCategoryParams }>
  ): Promise<HttpResponse<Category>>;
}

export interface IdeleteCategoryRepository {
  searchCategoryExisting(params: IdeleteCategoryParams): Promise<boolean>;
  delete(params: IdeleteCategoryParams): Promise<void>;
}

export interface IdeleteCategoryParams {
  id: string;
}
