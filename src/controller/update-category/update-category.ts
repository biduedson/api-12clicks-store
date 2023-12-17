import { Category } from "@prisma/client";
import { IcreateCategoryRepository } from "../../interfaces/create-category/create-category";
import { HttpRequest, HttpResponse } from "../../interfaces/http/http";
import {
  IupdateCategoryController,
  IupdateCategoryRepository
} from "../../interfaces/update-category/update-category";
import { updateCategoryRepository } from "../../repositories/update-category/update-category";

class UpdateCategoryController implements IupdateCategoryController {
  constructor(
    private readonly updateCategoryRepository: IupdateCategoryRepository
  ) {}
  async handle(
    httpRequest: HttpRequest<Category>
  ): Promise<HttpResponse<Category>> {
    try {
      const { id } = httpRequest.body!;
      const categoryExisting =
        await this.updateCategoryRepository.searchCategoryExisting({ id });

      if (!categoryExisting) {
        return {
          statusCode: 404,
          body: "Essa categoria não existe."
        };
      }

      const categoryUpdated =
        await this.updateCategoryRepository.updateCategory(httpRequest.body!);

      return {
        statusCode: 200,
        body: categoryUpdated
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: `Erro interno do servidor. ${error}`
      };
    }
  }
}

export const updateCategoryController = new UpdateCategoryController(
  updateCategoryRepository
);
