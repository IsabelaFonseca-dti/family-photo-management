import apiInstance from "../../../shared/api/Api";
import UsersManager from "./UsersManager";
import UsersRepository from "./UsersRepository";

const usersRepositoryInstance = new UsersRepository(apiInstance);
const usersManagerInstance = new UsersManager(usersRepositoryInstance);

export default usersManagerInstance;
