import { FC, useEffect, useMemo, useState } from 'react';
import { ActionsContainer, AddMoreButton, GridContainer, AlbumsListContainer } from './styles/AlbumsList.styled';
import { BackButton, CardWithAction } from '../../../shared/components';
import { useUsersSlice } from '../../Users/hooks/useUsersSlice';
import { useLoadAlbumsByUser } from '../hooks/useLoadAlbumsByUser';
import { FaPlus } from 'react-icons/fa';
import { useAlbumsSlice } from '../hooks/useAlbumSlice';
import { useNavigate } from 'react-router-dom';
import { MainRoutesEnum } from '../../../app/types/MainRoutesEnum';
import { useAlbumDeletion } from '../hooks/useAlbumDeletion';
import AddAlbumsModal from './AddAlbumsModal';
import { useAlbumCreation } from '../hooks/useAlbumCreation';
import { IAlbumsByUserDTO } from '../types/IAlbumsByUserDTO';
import { ALBUM_TEXTS } from '../utils/constants';
import { generateUniqueRandomNumber } from '../../../shared/utils/helpers';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface IAlbumsListProps {}

const AlbumsList: FC<IAlbumsListProps> = () => {
  const { selectedUser } = useUsersSlice();
  const { deletedAlbums, deleteAlbumLocally, createAlbumLocally, createdAlbums, setSelectedAlbum } = useAlbumsSlice();
  const { deleteAlbum } = useAlbumDeletion();
  const { createAlbum } = useAlbumCreation();
  const { data, isLoading, isError } = useLoadAlbumsByUser(selectedUser?.id.toString() ?? undefined);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!selectedUser) {
      navigate('/');
    }
  }, [selectedUser, navigate]);

  useEffect(() => {
    if (isError) {
      navigate(`/${MainRoutesEnum.ERROR}`);
    }
  }, [isError, navigate]);

  const filteredAlbums = useMemo(() => {
    if (!selectedUser?.id) return [];

    const createdAlbumsByUser = createdAlbums[selectedUser.id] || [];
    const deletedAlbumsByUser = deletedAlbums[selectedUser.id] || [];
    const deletedIds = deletedAlbumsByUser.map(album => album.id);

    const validCreatedAlbums = createdAlbumsByUser.filter(album => !deletedIds.includes(album.id));

    const validFetchedAlbums = data?.filter(album => !deletedIds.includes(album.id)) ?? [];

    return [...validCreatedAlbums, ...validFetchedAlbums];
  }, [data, selectedUser?.id, createdAlbums, deletedAlbums]);

  const handleAlbumDeletion = async (id: number) => {
    try {
      if (selectedUser?.id) {
        await deleteAlbum(id.toString());
        const deletedItem = filteredAlbums.find(album => album.id == id);
        console.log('deletedItem', deletedItem);
        if (deletedItem) {
          deleteAlbumLocally(selectedUser?.id.toString(), deletedItem);
        }

        alert(ALBUM_TEXTS.albumDeletedSuccess);
      }
    } catch {
      alert(ALBUM_TEXTS.albumDeletedFailure);
    }
  };

  const handleAlbumCreation = async (albumTitle: string) => {
    try {
      if (selectedUser?.id) {
        const createdAlbum = await createAlbum({
          title: albumTitle,
          userId: selectedUser?.id,
        });
        const existingIds = Object.values(createdAlbums).flatMap(albums => albums.map(album => album.id));
        const newId = generateUniqueRandomNumber(existingIds, 1, 10000); //Generates unique id since api generates always with the same one
        createAlbumLocally(selectedUser.id.toString(), { ...createdAlbum, id: newId });

        alert(ALBUM_TEXTS.albumCreatedSuccess);
      }
    } catch {
      alert(ALBUM_TEXTS.albumCreatedFailure);
    }
  };

  const handleAlbumSelection = (album: IAlbumsByUserDTO) => {
    if (selectedUser) {
      setSelectedAlbum(album);
      navigate(
        `/${MainRoutesEnum.USERS}/${selectedUser.id}/${MainRoutesEnum.ALBUMS}/${album.id}/${MainRoutesEnum.PHOTOS}`,
      );
    }
  };

  const renderContent = () => {
    if (isLoading) {
      return <h2>{ALBUM_TEXTS.loading}</h2>;
    }
    if (data) {
      return (
        <>
          <BackButton />
          <ActionsContainer>
            <h2>{`${ALBUM_TEXTS.listOfAlbums} ${selectedUser?.username}'s (${selectedUser?.email})`}</h2>
            <AddMoreButton onClick={() => setIsOpen(true)}>
              <FaPlus /> {ALBUM_TEXTS.addMore}
            </AddMoreButton>
          </ActionsContainer>

          <GridContainer>
            {filteredAlbums.map((album, index) => {
              return (
                <CardWithAction
                  id={album.id}
                  key={`card-album-${index}`}
                  title={album.title}
                  actionName={ALBUM_TEXTS.seePhotos}
                  deleteButton
                  handleDelete={handleAlbumDeletion}
                  onClick={() => {
                    handleAlbumSelection(album);
                  }}
                />
              );
            })}
          </GridContainer>
        </>
      );
    }
  };

  return (
    <>
      <AlbumsListContainer>{renderContent()}</AlbumsListContainer>
      <AddAlbumsModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSubmit={(albumTitle: string) => handleAlbumCreation(albumTitle)}
      />
    </>
  );
};

export default AlbumsList;
