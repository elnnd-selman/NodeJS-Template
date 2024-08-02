import type { Request, RequestHandler, Response } from "express";

import { userService } from "@/api/user/userService";
import { handleServiceResponse } from "@/common/utils/httpHandlers";

class UserController {
  public getUsers: RequestHandler = async (_req: Request, res: Response) => {
    const serviceResponse = await userService.findAll();
    return handleServiceResponse(serviceResponse, res);
  };

  public registerUser: RequestHandler = async (req: Request, res: Response) => {
    const serviceResponse = await userService.registerUser(req.body);
    return handleServiceResponse(serviceResponse, res);
  };
}

export const userController = new UserController();
