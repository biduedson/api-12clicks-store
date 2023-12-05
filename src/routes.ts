import { Request, Response, Router } from "express";
import { CreateAdmUserRepository } from "./repositories/create-adm-user/create-adm-user";
import { CreateUserAdmController } from "./controller/create-adm-user/create-adm-user";
import { GetAdmUsersController } from "./controller/get-adm-user/get-adm-user";
import { GetAdmUsersRepository } from "./repositories/get-adm-user/get-adm-user";

const routes = Router();

export default routes;

routes.get("/administrators", async (req: Request, res: Response) => {
  const getAdmUserReporitory = new GetAdmUsersRepository();
  const getAdmUsersController = new GetAdmUsersController(getAdmUserReporitory);

  const { statusCode, body } = await getAdmUsersController.handle();

  res.status(statusCode).send(body);
});

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
