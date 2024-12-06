import { Request, Response } from "express";
import { userManager } from "../managers/user.manager";
import { handleError, handleSuccess } from "../helpers/response.helper";
class UserController {
  
  public getById = async (req: Request, res: Response): Promise<void> => {
    try {
      const { userId } = req.params;
      const user = await userManager.getById(parseInt(userId));
      res.status(200).send(user);
    } catch (error: any) {
      res.status(500).send(error);
    }
  };

  public login = async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, password } = req.body;

      const response = await userManager.login(email, password);

      res.cookie('authToken', response.data?.token, {
        httpOnly: true,        // Make the cookie HTTP-only
        secure: true,          // Set to true if using HTTPS
        sameSite: 'strict',    // Protects against CSRF attacks
        maxAge: 3600000        // Cookie expiration time (1 hour)
    });
      res.status(200).send(response);
    } catch (error: any) {
      res.status(500).send(error);
    }
  };
}

export const userController = new UserController();
