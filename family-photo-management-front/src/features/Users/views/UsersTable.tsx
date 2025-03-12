import { FC } from 'react';

import { ActionButton, Table, TableCell, TableHeader, TableRow } from './styles/UsersTable.styled';
import { IListUserDTO } from '../types/IListUserDTO';
import { USER_TEXTS } from '../utils/constants';

interface IUserTable {
  data: IListUserDTO[];
  action: (selectedUser: IListUserDTO) => void;
}

const UserTable: FC<IUserTable> = ({ data, action }) => {
  return (
    <Table>
      <thead>
        <tr>
          <TableHeader>{USER_TEXTS.name}</TableHeader>
          <TableHeader>{USER_TEXTS.email}</TableHeader>
          <TableHeader>{USER_TEXTS.seeAlbums}</TableHeader>
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <TableRow key={`table-row-${index}`}>
            <TableCell>{row.username}</TableCell>
            <TableCell>{row.email}</TableCell>
            <TableCell>
              <ActionButton onClick={() => action(row)}>🖼️</ActionButton>
            </TableCell>
          </TableRow>
        ))}
      </tbody>
    </Table>
  );
};

export default UserTable;
