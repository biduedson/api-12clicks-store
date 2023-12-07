import { Administrators } from "@prisma/client";
import { IfindAdmUser } from "../../interfaces/find-adm-user/find-adm-user";
import prisma from "../../services/prisma-client/prisma-client";

export class FindAdmUserRepository implements IfindAdmUser {
  constructor(private readonly id: number) {}
  async user(): Promise<Omit<Administrators, "password"> | boolean> {
    const user = await prisma.administrators.findUnique({
      where: {
        id: this.id,
      },
      select: {
        id: true,
        user: true,
        email: true,
      },
    });

    if (user) {
      return user;
    }

    return false;
  }
}
