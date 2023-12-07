import { Order } from "@prisma/client";
import { HttpRequest, HttpResponse } from "../http/http";

export interface IgetOderController {
  handle(): Promise<HttpResponse<Order[]>>;
}

export interface IgetOrderRepository {
  allOrder(): Promise<Order[]>;
}
