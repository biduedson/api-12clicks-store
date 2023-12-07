import { Administrators } from "@prisma/client";
import {
  IcreateAdmUserController,
  IcreateAdmUserParams,
  IcreateAdmUserRepository,
} from "../../interfaces/create-adm-user/create-adm-user";
import { HttpRequest, HttpResponse } from "../../interfaces/http/http";
import { createAdmUserRepository } from "../../repositories/create-adm-user/create-adm-user";

class CreateUserAdmController implements IcreateAdmUserController {
  constructor(
    private readonly createAdmUserRepository: IcreateAdmUserRepository
  ) {}

  async handle(
    httpRequest: HttpRequest<IcreateAdmUserParams>
  ): Promise<HttpResponse<Omit<Administrators, "password">>> {
    try {
      const { user, email } = httpRequest.body!;
      const findUserOrEmailExisting =
        await this.createAdmUserRepository.searchExistingAmdUser({
          user,
          email,
        });

      if (findUserOrEmailExisting.error) {
        return {
          statusCode: findUserOrEmailExisting.statusCode!,
          body: findUserOrEmailExisting.errorMessage!,
        };
      }

      const admUser = await this.createAdmUserRepository.createAdmUser(
        httpRequest.body!
      );
      return {
        statusCode: 201,
        body: admUser,
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: `Erro interno do servidor, ${error}`,
      };
    }
  }
}

export const createUserAdmController = new CreateUserAdmController(
  createAdmUserRepository
);
