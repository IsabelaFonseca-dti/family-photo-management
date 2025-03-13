import { FC, useEffect, useMemo, useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

import { BackButton, ImageSlider } from '../../../shared/components';
import { ActionsContainer, AddMoreButton, PhotoListContainer } from './styles/PhotoList.styled';
import { useUsersSlice } from '../../Users/hooks/useUsersSlice';
import { usePhotosSlice } from '../hooks/usePhotosSlice';
import { useLoadPhotosByAlbum } from '../hooks/useLoadPhotosByAlbum';
import { useAlbumsSlice } from '../../Albums/hooks/useAlbumSlice';
import { usePhotoDeletion } from '../hooks/usePhotoDeletion';
import AddPhotosModal from './AddPhotosModal';
import { usePhotoCreation } from '../hooks/usePhotoCreation';
import { getRandomPhotoUrl } from '../utils/photosUtils';
import { PHOTOS_TEXTS } from '../utils/constants';

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

  useEffect(() => {
    if (!selectedUser || !selectedAlbum) {
      navigate('/');
    }
  }, [selectedUser, selectedAlbum, navigate]);

  const filteredPhotos = useMemo(() => {
    if (!data) return [];

    const validCreatedPhotos = createdPhotos.filter(photo => !deletedPhotos.includes(photo.id));
    const validFetchedPhotos = data.filter(photo => !deletedPhotos.includes(photo.id));

    return [...validCreatedPhotos, ...validFetchedPhotos];
  }, [data, deletedPhotos, createdPhotos]);

  const handlePhotoCreation = async (photoTitle: string) => {
    try {
      if (selectedAlbum?.id) {
        const randomPhotoURL = getRandomPhotoUrl(); //Generates random URL since i wont be storing the file
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
      alert(PHOTOS_TEXTS.successPhotoCreated);
    } catch {
      alert(PHOTOS_TEXTS.errorPhotoCreated);
    }
  };

  const handlePhotoDeletion = async (index: number) => {
    try {
      const id = filteredPhotos[index].id;
      await deletePhoto(id.toString());
      deletePhotoLocally(id);
      alert(PHOTOS_TEXTS.successPhotoDeleted);
    } catch {
      alert(PHOTOS_TEXTS.errorPhotoDeleted);
    }
  };

  const renderContent = () => {
    if (isLoading) {
      return <h2>{PHOTOS_TEXTS.loading}</h2>;
    }
    if (data) {
      return (
        <>
          <BackButton />
          <ActionsContainer>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <h2>{PHOTOS_TEXTS.userPhotos(selectedUser?.username, selectedUser?.email)}</h2>
              <h3>{PHOTOS_TEXTS.albumTitle(selectedAlbum?.title)}</h3>
            </div>
            <AddMoreButton onClick={() => setIsModalOpen(true)}>
              <FaPlus /> {PHOTOS_TEXTS.addMore}
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
