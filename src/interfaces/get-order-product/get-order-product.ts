import { OrderProduct } from "@prisma/client";
import { HttpResponse } from "../http/http";

export interface IgetOrderProductcontroller {
  handle(): Promise<HttpResponse<OrderProduct[]>>;
}

export interface IgetOrderProductRepository {
  allOrderProducts(): Promise<OrderProduct[]>;
}
