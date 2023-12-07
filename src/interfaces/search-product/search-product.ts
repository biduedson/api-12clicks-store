import { Product } from "@prisma/client";
import { HttpRequest, HttpResponse } from "../http/http";

export interface IsearchProducController {
  handle(
    httpRequest: HttpRequest<{ params: IsearchProductsParams }>
  ): Promise<HttpResponse<Product>>;
}

export interface IsearchProductRepository {
  searchProduct(params: IsearchProductsParams): Promise<Product>;
}

export interface IsearchProductsParams {
  id: string;
}
