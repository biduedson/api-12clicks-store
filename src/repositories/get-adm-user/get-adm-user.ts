import { IgetUserRepository } from "../../interfaces/get-adm-user/get-adm-user";
import prisma from "../../services/prisma-client/prisma-client";

class GetAdmUsersRepository implements IgetUserRepository {
  async getUsers(): Promise<
    Omit<
      { id: number; user: string; email: string; password: string },
      "password"
    >[]
  > {
    const admUsers = await prisma.administrators.findMany({
      select: {
        id: true,
        user: true,
        email: true,
      },
    });
    return admUsers;
  }
}

export const getAdmUserRepository = new GetAdmUsersRepository();
