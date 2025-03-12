import { IListUserDTO } from "./IListUserDTO";

export interface IUsersRepository {
  listUsers(): Promise<IListUserDTO[]>;
}
