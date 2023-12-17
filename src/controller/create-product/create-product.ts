import { Product } from "@prisma/client";
import {
  IcreateProductController,
  IcreateProductRepository
} from "../../interfaces/create-product/create-product";
import { HttpRequest, HttpResponse } from "../../interfaces/http/http";
import { createProductRepository } from "../../repositories/create-product/create-product";

class CreateProductController implements IcreateProductController {
  constructor(
    private readonly createProductRepository: IcreateProductRepository
  ) {}
  async handle(
    httpRequest: HttpRequest<Omit<Product, "id">>
  ): Promise<HttpResponse<Product>> {
    try {
      const { name } = httpRequest.body!;

      const producExisting =
        await this.createProductRepository.searchProductExisting({ name });

      if (producExisting) {
        return {
          statusCode: 400,
          body: "Ja existe um produto cadastrado com o mesmo nome."
        };
      }

      const newProduct = await this.createProductRepository.createProduct(
        httpRequest.body!
      );

      return {
        statusCode: 201,
        body: newProduct
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: `Erro interno do servidor. ${error}`
      };
    }
  }
}

export const createProductController = new CreateProductController(
  createProductRepository
);
