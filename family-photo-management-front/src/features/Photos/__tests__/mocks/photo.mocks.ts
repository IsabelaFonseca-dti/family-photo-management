import { IAlbumsByUserDTO } from '../../../Albums/types/IAlbumsByUserDTO';
import { IListUserDTO } from '../../../Users/types/IListUserDTO';
import { IListPhotoDTO } from '../../types/IListPhotoDTO';

export const MOCK_SELECTED_USER: IListUserDTO = {
  email: 'useremail@com',
  username: 'user 1',
  id: 1,
};

export const MOCK_SELECTED_ALBUM: IAlbumsByUserDTO = {
  userId: 1,
  title: 'album 1',
  id: 1,
};

export const MOCK_LIST_ALBUMS: IListPhotoDTO[] = [
  {
    albumId: 1,
    id: 1,
    title: 'Photo 1',
    url: 'https://via.placeholder.com/600/92c952',
    thumbnailUrl: 'https://via.placeholder.com/150/92c952',
  },
  {
    albumId: 1,
    id: 2,
    title: 'Photo 2',
    url: 'https://via.placeholder.com/600/771796',
    thumbnailUrl: 'https://via.placeholder.com/150/771796',
  },
  {
    albumId: 2,
    id: 3,
    title: 'Photo 3',
    url: 'https://via.placeholder.com/600/24f355',
    thumbnailUrl: 'https://via.placeholder.com/150/24f355',
  },
  {
    albumId: 2,
    id: 4,
    title: 'Photo 4',
    url: 'https://via.placeholder.com/600/d32776',
    thumbnailUrl: 'https://via.placeholder.com/150/d32776',
  },
];
