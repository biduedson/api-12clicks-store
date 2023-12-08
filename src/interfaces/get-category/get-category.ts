import { Category } from "@prisma/client";
import { HttpResponse } from "../http/http";

export interface IgetCategoryController {
  handle(): Promise<HttpResponse<Category[]>>;
}

export interface IgetCategoryRepository {
  allCategory(): Promise<Category[]>;
}
