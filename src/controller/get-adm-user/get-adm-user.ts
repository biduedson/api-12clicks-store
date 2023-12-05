import {
  IgetUserController,
  IgetUserRepository,
} from "../../interfaces/get-adm-user/get-adm-user";
import { HttpResponse } from "../../interfaces/http/http";

export class GetAdmUsersController implements IgetUserController {
  constructor(private readonly getUserRepository: IgetUserRepository) {}
  async handle(): Promise<
    HttpResponse<
      Omit<
        { id: number; user: string; email: string; password: string },
        "password"
      >[]
    >
  > {
    try {
      const users = await this.getUserRepository.getUsers();
      return {
        statusCode: 200,
        body: users,
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: `Erro interno do servidor. ${error}`,
      };
    }
  }
}
