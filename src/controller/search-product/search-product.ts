import { Decimal } from "@prisma/client/runtime/library";
import { HttpRequest, HttpResponse } from "../../interfaces/http/http";
import {
  IsearchProducController,
  IsearchProductRepository,
  IsearchProductsParams,
} from "../../interfaces/search-product/search-product";
import { Product } from "@prisma/client";
import { searchProdutRepository } from "../../repositories/search-product/search-product";

class SearchProductController implements IsearchProducController {
  constructor(
    private readonly searchProductRepository: IsearchProductRepository
  ) {}

  async handle(
    httpRequest: HttpRequest<{ params: IsearchProductsParams }>
  ): Promise<HttpResponse<Product>> {
    try {
      const product = await this.searchProductRepository.searchProduct(
        httpRequest.params
      );

      if (!product) {
        return {
          statusCode: 404,
          body: "Produto não encontrado.",
        };
      }

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

export const searchProductController = new SearchProductController(
  searchProdutRepository
);
