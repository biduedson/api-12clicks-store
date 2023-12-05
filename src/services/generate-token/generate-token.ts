import { IgenerateToken } from "../../interfaces/generate-token/generate-token";
import jwt from "jsonwebtoken";
export class GenerateToken implements IgenerateToken {
  constructor(private readonly id: number) {}
  generateToken(): string {
    const token = jwt.sign({ id: this.id }, String(process.env.JWT_PASS), {
      expiresIn: "8h",
    });

    return token;
  }
}
