import { Category } from "@prisma/client";
import {
  IdeleteCategoryController,
  IdeleteCategoryParams,
  IdeleteCategoryRepository,
} from "../../interfaces/delete-category/delete-category";
import { HttpRequest, HttpResponse } from "../../interfaces/http/http";
import { deleteCategoryRepository } from "../../repositories/delete-category/delete-category";

class DeleteCategoryController implements IdeleteCategoryController {
  constructor(
    private readonly deleteCategoryRepository: IdeleteCategoryRepository
  ) {}

  async handle(
    httpResquest: HttpRequest<{ params: IdeleteCategoryParams }>
  ): Promise<HttpResponse<Category>> {
    try {
      const id = httpResquest.params;
      const category =
        await this.deleteCategoryRepository.searchCategoryExisting(id);

      if (!category) {
        return {
          statusCode: 404,
          body: "Categoria não encontrada",
        };
      }

      await this.deleteCategoryRepository.delete(httpResquest.params);

      return {
        statusCode: 204,
        body: "",
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: `Erro interno do servidor. ${error}`,
      };
    }
  }
}

export const deleteCategoryController = new DeleteCategoryController(
  deleteCategoryRepository
);
