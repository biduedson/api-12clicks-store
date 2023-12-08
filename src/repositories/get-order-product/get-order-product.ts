import { Decimal } from "@prisma/client/runtime/library";
import { IgetOrderProductRepository } from "../../interfaces/get-order-product/get-order-product";
import { OrderProduct } from "@prisma/client";
import prisma from "../../services/prisma-client/prisma-client";

class GetOrderProductRepository implements IgetOrderProductRepository {
  async allOrderProducts(): Promise<OrderProduct[]> {
    const orderProduct = await prisma.orderProduct.findMany();
    return orderProduct;
  }
}

export const getOrderProductRepository = new GetOrderProductRepository();
