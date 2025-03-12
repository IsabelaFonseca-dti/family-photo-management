import { FC } from 'react';

import { ActionButton, Table, TableCell, TableHeader, TableRow } from './styles/UsersTable.styled';
import { IListUserDTO } from '../types/IListUserDTO';

interface IUserTable {
  data: IListUserDTO[];
  action: (selectedUser: IListUserDTO) => void;
}

const UserTable: FC<IUserTable> = ({ data, action }) => {
  return (
    <Table>
      <thead>
        <tr>
          <TableHeader>Name</TableHeader>
          <TableHeader>E-mail</TableHeader>
          <TableHeader>See Albums</TableHeader>
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
