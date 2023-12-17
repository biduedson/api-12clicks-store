import { Product } from "@prisma/client";
import {
  IsearchCategoryUpdatedParams,
  IupdateCategoryRepository
} from "../../interfaces/update-category/update-category";
import prisma from "../../services/prisma-client/prisma-client";
import { IupdateProductRepository } from "../../interfaces/update-product/update-product";

class UpdateProductRepository implements IupdateProductRepository {
  async searchPtoductExisting(
    params: IsearchCategoryUpdatedParams
  ): Promise<boolean> {
    const [currentProduc] = await prisma.product.findMany({
      where: {
        id: params.id
      }
    });

    if (currentProduc) {
      return true;
    }

    return false;
  }

  async updateProduct(params: Product): Promise<Product> {
    const [currentProduc] = await prisma.product.findMany({
      where: {
        id: params.id
      },
      select: {
        name: true,
        slug: true,
        description: true,
        basePrice: true,
        imageUrls: true,
        categoryId: true,
        discountPercentage: true
      }
    });
    const productUpdated = await prisma.product.update({
      where: {
        id: params.id
      },
      data: {
        name: params.name || currentProduc.name,
        slug: params.slug || currentProduc.slug,
        description: params.description || currentProduc.description,
        basePrice: params.basePrice || currentProduc.basePrice,
        imageUrls: params.imageUrls || currentProduc.imageUrls,
        categoryId: params.categoryId || currentProduc.categoryId,
        discountPercentage:
          params.discountPercentage || currentProduc.discountPercentage
      }
    });

    return productUpdated;
  }
}

export const updateProductRepository = new UpdateProductRepository();
