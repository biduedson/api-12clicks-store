import { Decimal } from "@prisma/client/runtime/library";
import {
  IcreateProductRepository,
  searchProductExistingParams
} from "../../interfaces/create-product/create-product";
import prisma from "../../services/prisma-client/prisma-client";
import { Product } from "@prisma/client";

class CreateProductRepository implements IcreateProductRepository {
  async searchProductExisting(
    params: searchProductExistingParams
  ): Promise<boolean> {
    const product = await prisma.product.findMany({
      where: {
        name: params.name
      },
      select: {
        name: true
      }
    });

    if (product.length > 0) {
      return true;
    }

    return false;
  }
  async createProduct(params: Omit<Product, "id">) {
    const newProdut = await prisma.product.create({
      data: {
        name: params.name,
        slug: params.slug,
        description: params.description,
        basePrice: params.basePrice,
        imageUrls: params.imageUrls,
        categoryId: params.categoryId,
        discountPercentage: params.discountPercentage
      }
    });
    return newProdut;
  }
}

export const createProductRepository = new CreateProductRepository();
