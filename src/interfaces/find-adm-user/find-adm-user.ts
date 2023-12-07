import { Administrators } from "@prisma/client";

export interface IfindAdmUser {
  user(): Promise<Omit<Administrators, "password"> | boolean>;
}
