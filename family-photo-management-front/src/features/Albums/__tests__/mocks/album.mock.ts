import { IListUserDTO } from '../../../Users/types/IListUserDTO';
import { IAlbumsByUserDTO } from '../../types/IAlbumsByUserDTO';

export const MOCK_SELECTED_ALBUM: IAlbumsByUserDTO = {
  userId: 1,
  title: 'album 1',
  id: 1,
};

export const MOCK_ALBUMS: IAlbumsByUserDTO[] = [
  {
    userId: 1,
    title: 'album 1',
    id: 1,
  },
];

export const MOCK_SELECTED_USER: IListUserDTO = {
  email: 'useremail@com',
  username: 'user 1',
  id: 1,
};
