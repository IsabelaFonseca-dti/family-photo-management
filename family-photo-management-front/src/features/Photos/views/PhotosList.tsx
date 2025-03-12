import { FC } from 'react';
import { BackButton, ImageSlider } from '../../../shared/components';
import { ActionsContainer, AddMoreButton, PhotoListContainer } from './styles/PhotoList.styled';
import { FaPlus } from 'react-icons/fa';
import { useUsersSlice } from '../../Users/hooks/useUsersSlice';
import { useAlbumsSlice } from '../hooks/useAlbumSlice';
import { useNavigate } from 'react-router-dom';
import { MainRoutesEnum } from '../../../app/types/MainRoutesEnum';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface IPhotosListProps {}

const PhotosList: FC<IPhotosListProps> = () => {
  const { selectedUser } = useUsersSlice();
  const { selectedAlbum } = useAlbumsSlice();
  const navigate = useNavigate();

  if (!selectedUser || !selectedAlbum) {
    navigate(`/${MainRoutesEnum.USERS}`);
  }

  const mockPhotos = [
    {
      albumId: 3,
      id: 101,
      title: 'incidunt alias vel enim',
      url: 'https://picsum.photos/600/400?random=1',
      thumbnailUrl: 'https://via.placeholder.com/150/e743b',
    },
    {
      albumId: 3,
      id: 102,
      title: 'eaque iste corporis tempora vero distinctio consequuntur nisi nesciunt',
      url: 'https://picsum.photos/600/400?random=2',
      thumbnailUrl: 'https://via.placeholder.com/150/a393af',
    },
  ];
  return (
    <>
      <PhotoListContainer>
        <BackButton />
        <ActionsContainer>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <h2>{`List of ${selectedUser?.username}'s (${selectedUser?.email}) Photos`}</h2>
            <h3>{`Album ${selectedAlbum?.title}`}</h3>
          </div>
          <AddMoreButton onClick={() => {}}>
            <FaPlus /> Add More
          </AddMoreButton>
        </ActionsContainer>
        <ImageSlider images={mockPhotos} />
      </PhotoListContainer>
    </>
  );
};

export default PhotosList;
