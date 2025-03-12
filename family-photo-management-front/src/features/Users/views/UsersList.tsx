import { FC } from "react";
import { IListUserDTO } from "../types/IListUserDTO";
import { MainContent } from "./styles/UsersList.styled";
import UserTable from "./UsersTable";
import { USER_TEXTS } from "../utils/constants";
import { useNavigate } from "react-router-dom";
import { MainRoutesEnum } from "../../../app/types/MainRoutesEnum";
import { useUsersSlice } from "../hooks/useUsersSlice";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface IUsersListProps {}

const UsersList: FC<IUsersListProps> = () => {
  const navigate = useNavigate();
  const { setSelectedUser } = useUsersSlice();
  // Mock dos usuários
  const mockUsers: IListUserDTO[] = [
    {
      id: 1,
      userName: "João Silva",
      email: "joao.silva@example.com",
    },
    {
      id: 2,
      userName: "Maria Oliveira",
      email: "maria.oliveira@example.com",
    },
    {
      id: 3,
      userName: "Pedro Souza",
      email: "pedro.souza@example.com",
    },
    {
      id: 4,
      userName: "Ana Costa",
      email: "ana.costa@example.com",
    },
    {
      id: 5,
      userName: "Carlos Pereira",
      email: "carlos.pereira@example.com",
    },
    {
      id: 5,
      userName: "Carlos Pereira",
      email: "carlos.pereira@example.com",
    },
    {
      id: 5,
      userName: "Carlos Pereira",
      email: "carlos.pereira@example.com",
    },
  ];

  const handleUserSelection = (user: IListUserDTO) => {
    setSelectedUser(user);
    navigate(`/${MainRoutesEnum.USERS}/${user.id}/${MainRoutesEnum.ALBUMS}`);
  };

  return (
    <MainContent>
      <h2>{USER_TEXTS.usersList}</h2>
      <UserTable data={mockUsers} action={handleUserSelection} />
    </MainContent>
  );
};

export default UsersList;
