import { Product } from "@prisma/client";
import { HttpRequest, HttpResponse } from "../http/http";

export interface IupdateCategoryParams {
  id: string;
}

export interface IupdateProcutController {
  handle(httpRequest: HttpRequest<Product>): Promise<HttpResponse<Product>>;
}

export interface IupdateProductRepository {
  searchPtoductExisting(params: IupdateCategoryParams): Promise<boolean>;
  updateProduct(params: Product): Promise<Product>;
}
