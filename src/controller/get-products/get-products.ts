import { Decimal } from "@prisma/client/runtime/library";
import {
  IgetProductController,
  IgetProductRepository,
} from "../../interfaces/get-products/get-products";
import { HttpResponse } from "../../interfaces/http/http";
import { Product } from "@prisma/client";
import { getProductRepository } from "../../repositories/get-products/get-products";

class GetProductController implements IgetProductController {
  constructor(private readonly getProductRepository: IgetProductRepository) {}
  async handle(): Promise<
    HttpResponse<
      {
        id: string;
        name: string;
        slug: string;
        description: string;
        basePrice: Decimal;
        imageUrls: string[];
        categoryId: string;
        discountPercentage: number;
      }[]
    >
  > {
    try {
      const product: Product[] = await this.getProductRepository.getProduct();

      return {
        statusCode: 200,
        body: product,
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: `Erro interno do servidor. ${error}`,
      };
    }
  }
}

export const getProductcontroller = new GetProductController(
  getProductRepository
);
