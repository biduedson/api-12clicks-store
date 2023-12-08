import {
  IgetOrderProductRepository,
  IgetOrderProductcontroller,
} from "../../interfaces/get-order-product/get-order-product";
import { HttpResponse } from "../../interfaces/http/http";
import { OrderProduct } from "@prisma/client";
import { getOrderProductRepository } from "../../repositories/get-order-product/get-order-product";

class GetOrderProductController implements IgetOrderProductcontroller {
  constructor(
    private readonly getOrderProductRepository: IgetOrderProductRepository
  ) {}
  async handle(): Promise<HttpResponse<OrderProduct[]>> {
    try {
      const orderProduct =
        await this.getOrderProductRepository.allOrderProducts();
      return {
        statusCode: 200,
        body: orderProduct,
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: `Erro interno do servidor. ${error}`,
      };
    }
  }
}

export const getOrderProductController = new GetOrderProductController(
  getOrderProductRepository
);
