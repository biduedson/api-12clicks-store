import { IvalidatePassword } from "../../interfaces/validate-password/validate-password";
import bcrypt from "bcrypt";

export class ValidatePassword implements IvalidatePassword {
  constructor(
    private readonly email: string,
    private readonly passwordForCompare: string
  ) {}

  async validatePassword(): Promise<boolean> {
    const password = await bcrypt.compare(this.email, this.passwordForCompare);

    return password;
  }
}
