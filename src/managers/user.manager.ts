import { promises } from "dns";
import jwt from 'jsonwebtoken'
import { userRepository } from "../repository/user.repository";
import { User } from "../types/models/user.model";
import { LoginResponseDto } from "../types/responses/users/loginResponseDto";
import { ResponseData } from "../types/responses/api-response.interface";
const crypto = require("crypto");

class UserManager {
  async getById(userId: number): Promise<null | User> {
    const response = await userRepository.getById(userId);
    return response;
  }

  async login(
    email: string,
    password: string
  ): Promise<ResponseData<LoginResponseDto | null>> {
    
    const user = await userRepository.getByEmail(email);

    if (!user) {
      return {
        success: false,
        message: `LOGIN_NO_EMIL_FOUND`,
        data: null,
      };
    }

    const userVerified = await this.compareUser(email, password, user);

    if (!userVerified) {
      return {
        success: false,
        message: "LOGIN_INVALID_CREDENTIALS",
        data: null,
      };
    }

    // Generate authentication token
    const authToken = this.generateAuthToken(user.id);

    return {
      success: true,
      message: "LOGIN_SUCCESSFULL",
      data: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        token: authToken,
      },
    };
  }

  private compareUser(email: string, password: string, user: User): boolean {
    const userEmai = user.email;
    const hasedPassword = user.password;

    if (email == userEmai && password == hasedPassword) {
      return true;
    }

    return false;
  }

  private generateAuthToken = (userId: number): string => {
    const payload = { id: userId }; 
    const secretKey = process.env.JWT_SECRET as string; 
    const token =  jwt.sign(payload, secretKey, { expiresIn: '1h' }); // Token will expire in 1 hour 
    return token;
  };

  private getHashedPassword = (password: string): string => {
    const sha256 = crypto.createHash("sha256");
    const hash = sha256.update(password).digest("base64");
    return hash;
  };
}

export const userManager = new UserManager();
