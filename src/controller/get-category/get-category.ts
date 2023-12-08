import { Category } from "@prisma/client";
import {
  IgetCategoryController,
  IgetCategoryRepository,
} from "../../interfaces/get-category/get-category";
import { HttpResponse } from "../../interfaces/http/http";
import { getCategoryRepository } from "../../repositories/get-category/get-category";

class GetCategoryController implements IgetCategoryController {
  constructor(private readonly getCategoryRepository: IgetCategoryRepository) {}
  async handle(): Promise<HttpResponse<Category[]>> {
    try {
      const category = await this.getCategoryRepository.allCategory();

      return {
        statusCode: 200,
        body: category,
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: `Erro interno do servidor. ${error}`,
      };
    }
  }
}

export const getCategoryController = new GetCategoryController(
  getCategoryRepository
);
