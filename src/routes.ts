import { NextFunction, Request, Response, Router } from "express";
import { createUserAdmController } from "./controller/create-adm-user/create-adm-user";
import { getAdmUsersController } from "./controller/get-adm-user/get-adm-user";
import { loginUserController } from "./controller/login/login";
import { getProductcontroller } from "./controller/get-products/get-products";
import { jwtValidator } from "./middleware/jwt-validation/jwt-validation";

const routes = Router();

export default routes;

routes.post("/login", async (req: Request, res: Response) => {
  const { statusCode, body } = await loginUserController.handle({
    body: req.body!,
  });
  res.status(statusCode).send(body);
});

routes.use((req: Request, res: Response, next: NextFunction) => {
  jwtValidator.validateToken(req, res, next);
});

routes.get("/administrators", async (req: Request, res: Response) => {
  const { statusCode, body } = await getAdmUsersController.handle();
  res.status(statusCode).send(body);
});

routes.post("/administrators", async (req: Request, res: Response) => {
  const { body, statusCode } = await createUserAdmController.handle({
    body: req.body!,
  });
  res.status(statusCode).send(body);
});

routes.get("/product", async (req: Request, res: Response) => {
  const { statusCode, body } = await getProductcontroller.handle();
  res.status(statusCode).send(body);
});
