import users from "../mockData/users.json";
import { User } from "../types/models/user.model";

class UserRepository {
  async getById(userId: number): Promise<null | User> {
    const user = users.find((u) => u.id == userId);
    if (!user) {
      return null;
    }
    return user;
  }

  async getByEmail(email: string): Promise<null | User> {
    const user = users.find((u) => u.email == email);
    if (!user) {
      return null;
    }
    return user;
  }
}

export const userRepository = new UserRepository();