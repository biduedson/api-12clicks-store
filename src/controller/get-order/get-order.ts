import { $Enums, Order } from "@prisma/client";
import {
  IgetOderController,
  IgetOrderRepository,
} from "../../interfaces/get-order/get-order";
import { HttpResponse } from "../../interfaces/http/http";
import { getAdmUsersRepository } from "../../repositories/get-order/get-order";

class GetOrderController implements IgetOderController {
  constructor(private readonly getOrderRepository: IgetOrderRepository) {}
  async handle(): Promise<HttpResponse<Order[]>> {
    try {
      const order = await this.getOrderRepository.allOrder();
      return {
        statusCode: 200,
        body: order,
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: `Erro interno do servidor. ${error}`,
      };
    }
  }
}

export const getOrderController = new GetOrderController(getAdmUsersRepository);
