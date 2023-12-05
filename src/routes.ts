import { Request, Response, Router } from "express";
import { CreateAdmUserRepository } from "./repositories/create-adm-user/create-adm-user";
import { CreateUserAdmController } from "./controller/create-adm-user/create-adm-user";

const routes = Router();

export default routes;

routes.post("/administrators", async (req: Request, res: Response) => {
  const createAdmUserRepository = new CreateAdmUserRepository();
  const createUserAdmController = new CreateUserAdmController(
    createAdmUserRepository
  );

  const { body, statusCode } = await createUserAdmController.handle({
    body: req.body!,
  });

  res.status(statusCode).send(body);
});
