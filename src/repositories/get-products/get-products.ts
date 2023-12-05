import { Decimal } from "@prisma/client/runtime/library";
import { IgetProductRepository } from "../../interfaces/get-products/get-products";
import prisma from "../../services/prisma-client/prisma-client";

export class GetProductRepository implements IgetProductRepository {
  async getProduct(): Promise<
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
  > {
    const product = await prisma.product.findMany();

    return product;
  }
}
