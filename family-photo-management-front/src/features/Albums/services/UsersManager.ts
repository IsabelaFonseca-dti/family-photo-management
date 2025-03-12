import { IListUserDTO } from "../types/IListUserDTO";
import { IUsersRepository } from "../types/IUsersRepository";

export class UsersManager {
  constructor(private readonly repository: IUsersRepository) {}

  async getUsers(): Promise<IListUserDTO[] | null> {
    console.log("manager");
    const users = await this.repository.listUsers();
    return users;
  }
}

export default UsersManager;
