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
import EmptyPhotos from './EmptyPhotos';
import { generateUniqueRandomNumber } from '../../../shared/utils/helpers';
import { MainRoutesEnum } from '../../../app/types/MainRoutesEnum';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface IPhotosListProps {}

const PhotosList: FC<IPhotosListProps> = () => {
  const { selectedUser } = useUsersSlice();
  const { selectedAlbum } = useAlbumsSlice();
  const { postPhoto } = usePhotoCreation();
  const { deletePhoto } = usePhotoDeletion();
  const { deletePhotoLocally, deletedPhotos, createPhotoLocally, createdPhotos } = usePhotosSlice();
  const navigate = useNavigate();
  const { data, isLoading, isError } = useLoadPhotosByAlbum(selectedAlbum?.id.toString() ?? undefined);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    if (!selectedUser || !selectedAlbum) {
      navigate('/');
    }
  }, [selectedUser, selectedAlbum, navigate]);

  useEffect(() => {
    if (isError) {
      navigate(`/${MainRoutesEnum.ERROR}`);
    }
  }, [isError, navigate]);

  const filteredPhotos = useMemo(() => {
    if (!selectedAlbum?.id) return [];

    const createdPhotosInAlbum = createdPhotos[selectedAlbum?.id] || [];

    const validCreatedPhotos = createdPhotosInAlbum.filter(photo => {
      const deletedInAlbum = deletedPhotos[photo.albumId] || [];
      return !deletedInAlbum.some(deletedPhoto => deletedPhoto.id === photo.id);
    });

    const validFetchedPhotos =
      data?.filter(photo => {
        const deletedInAlbum = deletedPhotos[photo.albumId] || [];
        return !deletedInAlbum.some(deletedPhoto => deletedPhoto.id === photo.id);
      }) ?? [];

    return [...validCreatedPhotos, ...validFetchedPhotos];
  }, [data, selectedAlbum?.id, createdPhotos, deletedPhotos]);

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

        const existingIds = Object.values(createdPhotos).flatMap(photos => photos.map(photo => photo.id));
        const newId = generateUniqueRandomNumber(existingIds, 1, 10000); //Generates unique id since api generates always with the same one
        createPhotoLocally(selectedAlbum.id.toString(), { ...createdPhoto, id: newId });
      }
      alert(PHOTOS_TEXTS.successPhotoCreated);
    } catch {
      alert(PHOTOS_TEXTS.errorPhotoCreated);
    }
  };

  const handlePhotoDeletion = async (index: number, callback?: () => void) => {
    try {
      if (selectedAlbum?.id) {
        const id = filteredPhotos[index].id;
        await deletePhoto(id.toString());
        deletePhotoLocally(selectedAlbum.id.toString(), filteredPhotos[index]);
        callback?.();
        alert(PHOTOS_TEXTS.successPhotoDeleted);
      }
    } catch {
      alert(PHOTOS_TEXTS.errorPhotoDeleted);
    }
  };

  const renderImages = () => {
    if (filteredPhotos?.length) {
      return <ImageSlider images={filteredPhotos} onDelete={handlePhotoDeletion} />;
    }
    return <EmptyPhotos />;
  };

  const renderContent = () => {
    if (isLoading) {
      return <h2>{PHOTOS_TEXTS.loading}</h2>;
    }
    if (filteredPhotos) {
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
          {renderImages()}
        </>
      );
    }
    return;
  };

  return (
    <>
      <PhotoListContainer>{renderContent()}</PhotoListContainer>
      <AddPhotosModal isOpen={isModalOpen} onSubmit={handlePhotoCreation} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default PhotosList;
