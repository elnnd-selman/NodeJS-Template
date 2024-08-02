import type { Request, RequestHandler, Response } from "express";

import { handleServiceResponse } from "@/common/utils/httpHandlers";
import { authService } from "./authService";

class AuthController {
  public register: RequestHandler = async (_req: Request, res: Response) => {
    const serviceResponse = await authService.userRegister();
    return handleServiceResponse(serviceResponse, res);
  };
}

export const authController = new AuthController();
