import { Request, Response } from "express";
import { userManager } from "../managers/user.manager";
import { handleError, handleSuccess } from "../helpers/response.helper";
class UserController{
public getById = async(req: Request, res: Response) : Promise<void>  => {
  try{
    const { userId } = req.params; 
    const user = await userManager.getById(parseInt(userId));
    res.status(200).send(user);
  } catch(error : any){
    res.status(500).send(error);
  } 
}

public login = async(req: Request, res: Response) : Promise<void>  => {
  try {
    const {email, password} = req.body

    const response = await userManager.login(email,password);

    handleSuccess(res, "USER_LOGGED_IN", response);
  } catch (error: any) {
    handleError(res, error);
  }
}
}

export const userController = new UserController();
