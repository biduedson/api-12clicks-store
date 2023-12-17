import { Category } from "@prisma/client";
import {
  IcreateCategoryRepository,
  IsearchCategoryParams
} from "../../interfaces/create-category/create-category";
import prisma from "../../services/prisma-client/prisma-client";

class CreateCategoryReposiotory implements IcreateCategoryRepository {
  async searchCategoryExisting(
    params: IsearchCategoryParams
  ): Promise<boolean> {
    const category = await prisma.category.findMany({
      where: {
        name: params.name!
      },
      select: {
        name: true
      }
    });
    if (category.length > 0) {
      return true;
    }
    return false;
  }

  async createCategory(params: Omit<Category, "id">): Promise<Category> {
    const category = await prisma.category.create({
      data: {
        name: params.name,
        slug: params.slug,
        imageUrl: params.imageUrl
      }
    });

    return category;
  }
}

export const createCategoryReposiotory = new CreateCategoryReposiotory();
