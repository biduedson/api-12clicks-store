import { Category } from "@prisma/client";
import {
  IcreateCategoryController,
  IcreateCategoryRepository
} from "../../interfaces/create-category/create-category";
import { HttpRequest, HttpResponse } from "../../interfaces/http/http";
import { createCategoryReposiotory } from "../../repositories/create-category/create-category";

class CreateCategoryController implements IcreateCategoryController {
  constructor(
    private readonly createCategoryRepossitory: IcreateCategoryRepository
  ) {}
  async handle(
    httpRequest: HttpRequest<Omit<Category, "id">>
  ): Promise<HttpResponse<Category>> {
    try {
      const { name } = httpRequest.body!;
      const categoryExisting =
        await this.createCategoryRepossitory.searchCategoryExisting({ name });

      if (categoryExisting) {
        return {
          statusCode: 400,
          body: "Esta categoria ja existe."
        };
      }

      const category = await this.createCategoryRepossitory.createCategory(
        httpRequest.body!
      );

      return {
        statusCode: 201,
        body: category
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: `Erro interno do servidor.${error}`
      };
    }
  }
}

export const createCategoryController = new CreateCategoryController(
  createCategoryReposiotory
);
