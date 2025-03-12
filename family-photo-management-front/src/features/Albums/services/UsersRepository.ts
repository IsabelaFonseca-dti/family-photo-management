import { Api, API_ROUTES } from "../../../shared/api";
import { IListUserDTO } from "../types/IListUserDTO";
import { IUsersRepository } from "../types/IUsersRepository";

export class UsersRepository implements IUsersRepository {
  constructor(private readonly api: Api) {}

  async listUsers(): Promise<IListUserDTO[]> {
    const url = API_ROUTES.GET_USERS;

    const response = await this.api.get<IListUserDTO[]>(url);
    return response?.data;
  }
}

export default UsersRepository;
