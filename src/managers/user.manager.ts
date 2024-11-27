import { promises } from "dns";
import { userRepository } from "../repository/user.repository";
import { User } from "../types/models/user.model";
const crypto = require('crypto');

class UserManager {
  async getById(userId: number) : Promise<null | User> {
    const response = await userRepository.getById(userId);
    return response;
  }

  async login(email: string, password: string) : Promise<{ error?: string; token?: string; user?: Partial<User> }> {
    const user = await userRepository.getByEmail(email);

    if (!user) {
      return { error: `No user with email ${email}` };
    }

    const userVerified = await this.compareUser(email, password, user);

    if (!userVerified) {
      return { error: `Invalid credentials for email ${email}` };
    }

    // Generate authentication token
    const authToken = this.generateAuthToken();

    return {
      token: authToken,
      user: user,
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

  private generateAuthToken = (): string => {
    return crypto.randomBytes(30).toString("hex");
  };

  private getHashedPassword = (password: string): string => {
    const sha256 = crypto.createHash("sha256");
    const hash = sha256.update(password).digest("base64");
    return hash;
  };
}


export const userManager = new UserManager();