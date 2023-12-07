import {
  IsearchProductRepository,
  IsearchProductsParams,
} from "../../interfaces/search-product/search-product";
import { Product } from "@prisma/client";
import prisma from "../../services/prisma-client/prisma-client";

class SearchProdutRepository implements IsearchProductRepository {
  async searchProduct(params: IsearchProductsParams): Promise<Product> {
    const product = await prisma.product.findUnique({
      where: {
        id: params.id,
      },
    });

    return product!;
  }
}

export const searchProdutRepository = new SearchProdutRepository();
