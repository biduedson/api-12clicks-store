import { Category } from "@prisma/client";
import { IgetCategoryRepository } from "../../interfaces/get-category/get-category";
import prisma from "../../services/prisma-client/prisma-client";

class GetCategoryRepository implements IgetCategoryRepository {
  async allCategory(): Promise<Category[]> {
    const category = await prisma.category.findMany();

    return category;
  }
}

export const getCategoryRepository = new GetCategoryRepository();
