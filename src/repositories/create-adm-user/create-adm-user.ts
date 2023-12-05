import { Administrators, PrismaClient } from "@prisma/client";
import {
  IcreateAdmUserParams,
  IcreateAdmUserRepository,
} from "../../interfaces/create-adm-user/create-adm-user";
import { IsearchExistingAdmUser } from "../../interfaces/search-existing-adm-user/search-existing-adm-user";
import { GeneratePasswordBcrypt } from "../../services/create-password-bycript/generate-password-bcrypt";

const prisma = new PrismaClient();

export class CreateAdmUserRepository implements IcreateAdmUserRepository {
  async searchExistingAmdUser(
    params: Omit<
      { id: number; user: string; email: string; password: string },
      "id" | "password"
    >
  ): Promise<IsearchExistingAdmUser> {
    const { user, email } = params;
    const dataUser = await prisma.administrators.findUnique({
      where: {
        user: user,
      },
    });

    const dataEmail = await prisma.administrators.findUnique({
      where: {
        email: email,
      },
    });

    if (dataUser) {
      return {
        error: true,
        existingUser: false,
        statusCode: 400,
        errorMessage: "Este usario ja esta cadastrado",
      };
    }
    if (dataEmail) {
      return {
        error: true,
        existingUser: false,
        statusCode: 400,
        errorMessage: "Este email ja esta cadastrado",
      };
    }

    return {
      error: false,
    };
  }

  async createAdmUser(
    params: IcreateAdmUserParams
  ): Promise<Omit<Administrators, "password">> {
    console.log(params);
    const { user, email, password } = params;
    const generatePasswordBcrypt = new GeneratePasswordBcrypt(password);

    const passwordBcrypt = generatePasswordBcrypt.generatePasswordHahs();
    const newUser = await prisma.administrators.create({
      data: {
        user: user,
        email: email,
        password: passwordBcrypt,
      },
      select: {
        id: true,
        user: true,
        email: true,
      },
    });

    return newUser;
  }
}
