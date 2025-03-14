import { FC, useEffect, useMemo, useState } from 'react';
import { IListUserDTO } from '../types/IListUserDTO';
import { FilterContainer, FilterInput, UsersListContent } from './styles/UsersList.styled';
import UserTable from './UsersTable';
import { USER_TEXTS } from '../utils/constants';
import { useNavigate } from 'react-router-dom';
import { MainRoutesEnum } from '../../../app/types/MainRoutesEnum';

import { useLoadAllUsers } from '../hooks/useLoadAllUsers';
import { useUsersSlice } from '../hooks/useUsersSlice';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface IUsersListProps {}

const UsersList: FC<IUsersListProps> = () => {
  const navigate = useNavigate();

  const { data, isLoading, isError } = useLoadAllUsers();

  const [search, setSearch] = useState<string>('');
  const { setSelectedUser } = useUsersSlice();

  const filteredUsers = useMemo(() => {
    if (search && data) {
      return data.filter(
        user =>
          user.username.toLowerCase().includes(search.toLowerCase()) ||
          user.email.toLowerCase().includes(search.toLowerCase()),
      );
    }
    return data ?? [];
  }, [search, data]);

  useEffect(() => {
    if (isError) {
      navigate(`/${MainRoutesEnum.ERROR}`);
    }
  }, [isError, navigate]);

  const handleUserSelection = (user: IListUserDTO) => {
    setSelectedUser(user);
    navigate(`/${MainRoutesEnum.USERS}/${user.id}/${MainRoutesEnum.ALBUMS}`);
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const renderContent = () => {
    if (isLoading) {
      return <h2>{USER_TEXTS.loading}</h2>;
    }
    if (data) {
      return (
        <>
          <FilterContainer>
            <h2>{USER_TEXTS.usersList}</h2>
            <FilterInput
              type="text"
              value={search}
              onChange={handleFilterChange}
              placeholder="Filter by name or email"
            />
          </FilterContainer>
          <UserTable data={filteredUsers} action={handleUserSelection} />
        </>
      );
    }
  };

  return <UsersListContent>{renderContent()}</UsersListContent>;
};

export default UsersList;
