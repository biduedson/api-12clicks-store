import { HttpRequest, HttpResponse } from "../../interfaces/http/http";
import {
  IupdateCategoryParams,
  IupdateProcutController,
  IupdateProductRepository
} from "../../interfaces/update-product/update-product";
import { Product } from "@prisma/client";
import { updateProductRepository } from "../../repositories/update-product/update-product";

class UpdateProductController implements IupdateProcutController {
  constructor(
    private readonly updateProductRepository: IupdateProductRepository
  ) {}
  async handle(
    httpRequest: HttpRequest<Product>
  ): Promise<HttpResponse<Product>> {
    try {
      const { id } = httpRequest.body!;
      const productExinting =
        await this.updateProductRepository.searchPtoductExisting({ id });

      if (!productExinting) {
        return {
          statusCode: 404,
          body: "Produto não encontrado."
        };
      }

      const productUpdated = await this.updateProductRepository.updateProduct(
        httpRequest.body!
      );

      return {
        statusCode: 200,
        body: productUpdated
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: `Erro interno do servidor. ${error}`
      };
    }
  }
}

export const updateProductController = new UpdateProductController(
  updateProductRepository
);
