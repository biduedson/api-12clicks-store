import { Category } from "@prisma/client";
import {
  IsearchCategoryUpdatedParams,
  IupdateCategoryRepository
} from "../../interfaces/update-category/update-category";
import prisma from "../../services/prisma-client/prisma-client";

class UpdateCategoryReposiotry implements IupdateCategoryRepository {
  async searchCategoryExisting(
    params: IsearchCategoryUpdatedParams
  ): Promise<boolean> {
    const category = await prisma.category.findMany({
      where: {
        id: params.id!
      }
    });

    if (category.length > 0) {
      return true;
    }
    return false;
  }

  async updateCategory(params: Category): Promise<Category> {
    const [currentCategory] = await prisma.category.findMany({
      where: {
        id: params.id
      },
      select: {
        name: true,
        slug: true,
        imageUrl: true
      }
    });

    const categoryUpdated = await prisma.category.update({
      where: {
        id: params.id
      },
      data: {
        name: params.name || currentCategory.name,
        slug: params.slug || currentCategory.slug,
        imageUrl: params.imageUrl || currentCategory.imageUrl
      }
    });

    return categoryUpdated;
  }
}

export const updateCategoryRepository = new UpdateCategoryReposiotry();
