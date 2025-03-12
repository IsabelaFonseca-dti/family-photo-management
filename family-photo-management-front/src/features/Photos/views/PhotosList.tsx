import { FC, useMemo, useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

import { BackButton, ImageSlider } from '../../../shared/components';
import { ActionsContainer, AddMoreButton, PhotoListContainer } from './styles/PhotoList.styled';
import { useUsersSlice } from '../../Users/hooks/useUsersSlice';
import { usePhotosSlice } from '../hooks/usePhotosSlice';
import { MainRoutesEnum } from '../../../app/types/MainRoutesEnum';
import { useLoadPhotosByAlbum } from '../hooks/useLoadPhotosByAlbum';
import { useAlbumsSlice } from '../../Albums/hooks/useAlbumSlice';
import { usePhotoDeletion } from '../hooks/usePhotoDeletion';
import AddPhotosModal from './AddPhotosModal';
import { usePhotoCreation } from '../hooks/usePhotoCreation';
import { getRandomPhotoUrl } from '../utils/photosUtils';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface IPhotosListProps {}

const PhotosList: FC<IPhotosListProps> = () => {
  const { selectedUser } = useUsersSlice();
  const { selectedAlbum } = useAlbumsSlice();
  const { postPhoto } = usePhotoCreation();
  const { deletePhoto } = usePhotoDeletion();
  const { deletePhotoLocally, deletedPhotos, createPhotoLocally, createdPhotos } = usePhotosSlice();
  const navigate = useNavigate();
  const { data, isLoading } = useLoadPhotosByAlbum(selectedAlbum?.id.toString() ?? undefined);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  if (!selectedUser || !selectedAlbum) {
    navigate(`/${MainRoutesEnum.USERS}`);
  }
  const filteredPhotos = useMemo(() => {
    if (!data) return [];

    const validCreatedPhotos = createdPhotos.filter(photo => !deletedPhotos.includes(photo.id));
    const validFetchedPhotos = data.filter(photo => !deletedPhotos.includes(photo.id));

    return [...validCreatedPhotos, ...validFetchedPhotos];
  }, [data, deletedPhotos, createdPhotos]);

  const handlePhotoCreation = async (photoTitle: string) => {
    try {
      if (selectedAlbum?.id) {
        const randomPhotoURL = getRandomPhotoUrl(); //generates random pic
        const createdPhoto = await postPhoto({
          title: photoTitle,
          albumId: selectedAlbum?.id,
          thumbnailUrl: randomPhotoURL,
          url: randomPhotoURL,
        });
        if (createdPhoto) {
          createPhotoLocally(createdPhoto);
        }
      }
      alert('Photo was created successfully');
    } catch {
      alert('Photo could not be created');
    }
  };

  const handlePhotoDeletion = async (index: number) => {
    try {
      const id = filteredPhotos[index].id;
      await deletePhoto(id.toString());
      deletePhotoLocally(id);
      alert('Photo was deleted successfully');
    } catch {
      alert('Photo could not be deleted');
    }
  };

  const renderContent = () => {
    if (isLoading) {
      return <h2>Loading...</h2>;
    }
    if (data) {
      return (
        <>
          <BackButton />
          <ActionsContainer>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <h2>{`List of ${selectedUser?.username}'s (${selectedUser?.email}) Photos`}</h2>
              <h3>{`Album ${selectedAlbum?.title}`}</h3>
            </div>
            <AddMoreButton
              onClick={() => {
                setIsModalOpen(true);
              }}
            >
              <FaPlus /> Add More
            </AddMoreButton>
          </ActionsContainer>
          <ImageSlider images={filteredPhotos} onDelete={handlePhotoDeletion} />
        </>
      );
    }
  };

  return (
    <>
      <PhotoListContainer>{renderContent()}</PhotoListContainer>
      <AddPhotosModal isOpen={isModalOpen} onSubmit={handlePhotoCreation} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default PhotosList;
