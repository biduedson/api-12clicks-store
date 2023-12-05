import { Product } from "@prisma/client";
import { HttpResponse } from "../http/http";

export interface IgetProductController {
  handle(): Promise<HttpResponse<Product[]>>;
}

export interface IgetProductRepository {
  getProduct(): Promise<Product[]>;
}
