import {
  IpasswordBcrypt,
  IpasswordCreateParams,
} from "../../interfaces/password-bcrypt.ts/password-bcrypt";

import bcypt from "bcrypt";

export class GeneratePasswordBcrypt {
  private readonly password: string;

  constructor(password: string) {
    this.password = password;
  }

  generatePasswordHahs(): string {
    const passwordBcrypt = bcypt.hashSync(this.password, 10);
    return passwordBcrypt;
  }
}
