import { IloggedInUser } from "../../interfaces/generate-token/generate-token";
import { HttpRequest, HttpResponse } from "../../interfaces/http/http";
import {
  IloginUserController,
  IloginUserParams,
  iLoginUserRepository,
} from "../../interfaces/login/login";
import { loginUserRepository } from "../../repositories/login/login";

class LoginUserController implements IloginUserController {
  constructor(private readonly loginUserRepository: iLoginUserRepository) {}
  async handle(
    httpRequest: HttpRequest<IloginUserParams>
  ): Promise<HttpResponse<IloggedInUser>> {
    try {
      const { email, password } = httpRequest.body!;

      const checkEmailAndPassword =
        await this.loginUserRepository.checkEmailAndPassword({
          email: email,
          password: password,
        });

      if (!checkEmailAndPassword) {
        return {
          statusCode: 400,
          body: "Email ou senha incorretos.",
        };
      }

      const userLogged = await this.loginUserRepository.createLogin(
        httpRequest.body!
      );

      return {
        statusCode: 200,
        body: userLogged,
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: `Erro interno do servidor. ${error}`,
      };
    }
  }
}

export const loginUserController = new LoginUserController(loginUserRepository);
