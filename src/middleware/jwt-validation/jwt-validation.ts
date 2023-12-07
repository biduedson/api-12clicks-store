import { Request, Response, NextFunction } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { IjwtValidation } from "../../interfaces/jwt-validation/jwt-validation";
import jwt, { JwtPayload } from "jsonwebtoken";
import { FindAdmUserRepository } from "../../repositories/find-adm-user/find-adm-user";

declare global {
  namespace Express {
    interface Request {
      user?: any; // Ou defina o tipo específico conforme necessário
    }
  }
}

class JwtValidator implements IjwtValidation {
  async validateToken(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(401).send("Não autorizado.");
    }
    try {
      const token = authorization.replace("Bearer", "").trim();
      const result = jwt.verify(token, String(process.env.JWT_PASS));

      if (typeof result === "string") {
        return res.status(401).send("Não autorizado.");
      }

      const { id } = result as JwtPayload;
      const findAdmUserRepository = new FindAdmUserRepository(id);
      const user = await findAdmUserRepository.user();

      if (!user) {
        return res.status(401).send("Usuario não encontrado.");
      }

      req.user = user;
      next();
    } catch (error) {
      res.status(500).send(`Erro interno do servidor. ${error}`);
    }
  }
}

export const jwtValidator = new JwtValidator();
