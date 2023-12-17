import { Product } from "@prisma/client";
import { HttpRequest, HttpResponse } from "../http/http";

export interface IcreateProductController {
  handle(
    httpRequest: HttpRequest<Omit<Product, "id">>
  ): Promise<HttpResponse<Product>>;
}

export interface searchProductExistingParams {
  name: string;
}
export interface IcreateProductRepository {
  searchProductExisting(params: searchProductExistingParams): Promise<boolean>;
  createProduct(params: Omit<Product, "id">): Promise<Product>;
}
