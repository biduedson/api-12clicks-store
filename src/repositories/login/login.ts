import { IloggedInUser } from "../../interfaces/generate-token/generate-token";
import {
  IloginUserParams,
  iLoginUserRepository,
} from "../../interfaces/login/login";
import { GenerateToken } from "../../services/generate-token/generate-token";
import prisma from "../../services/prisma-client/prisma-client";
import { ValidatePassword } from "../../services/validate-password/validate-password";

export class LoginUserRepository implements iLoginUserRepository {
  async checkEmailAndPassword(params: IloginUserParams): Promise<boolean> {
    const { email, password } = params;

    const user = await prisma.administrators.findUnique({
      where: {
        email: email,
      },
    });
    const validatePassword = new ValidatePassword(password, user?.password!);
    const passwordTrue = await validatePassword.validatePassword();
    console.log(passwordTrue);

    if (!user) {
      return false;
    }

    if (!passwordTrue) {
      return false;
    }
    return true;
  }
  async createLogin(params: IloginUserParams): Promise<IloggedInUser> {
    const user = await prisma.administrators.findUnique({
      where: {
        email: params.email,
      },
      select: {
        id: true,
        user: true,
        email: true,
      },
    });

    const generaToken = new GenerateToken(user?.id!);

    const token = generaToken.generateToken();
    return {
      user: {
        id: user!.id,
        user: user!.user,
        email: user!.email,
      },
      token: token,
    };
  }
}
