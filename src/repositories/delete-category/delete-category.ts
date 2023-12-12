import {
  IdeleteCategoryParams,
  IdeleteCategoryRepository
} from "../../interfaces/delete-category/delete-category";
import prisma from "../../services/prisma-client/prisma-client";

class DeleteCategoryRepository implements IdeleteCategoryRepository {
  async searchCategoryExisting(
    params: IdeleteCategoryParams
  ): Promise<boolean> {
    const category = await prisma.category.findUnique({
      where: {
        id: params.id
      }
    });

    if (category) {
      return true;
    }

    return false;
  }

  async delete(params: IdeleteCategoryParams): Promise<void> {
    await prisma.category.delete({
      where: {
        id: params.id
      }
    });
  }
}

export const deleteCategoryRepository = new DeleteCategoryRepository();
