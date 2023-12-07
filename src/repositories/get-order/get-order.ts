import { Order } from "@prisma/client";
import { IgetOrderRepository } from "../../interfaces/get-order/get-order";
import prisma from "../../services/prisma-client/prisma-client";

class GetOrderRepository implements IgetOrderRepository {
  async allOrder(): Promise<Order[]> {
    const order = await prisma.order.findMany({});

    return order;
  }
}

export const getAdmUsersRepository = new GetOrderRepository();
