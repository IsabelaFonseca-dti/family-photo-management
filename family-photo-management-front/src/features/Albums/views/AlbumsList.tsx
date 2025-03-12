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

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface IAlbumsListProps {}

const AlbumsList: FC<IAlbumsListProps> = () => {
  const { selectedUser } = useUsersSlice();
  const { deletedItems, deleteItemLocally, createItemLocally, createdItems, setSelectedAlbum } = useAlbumsSlice();
  const { deleteAlbum } = useAlbumDeletion();
  const { createAlbum } = useAlbumCreation();
  const { data, isLoading } = useLoadAlbumsByUser(selectedUser?.id.toString() ?? undefined);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!selectedUser) {
      navigate('/');
    }
  }, [selectedUser, navigate]);

  const filteredAlbums = useMemo(() => {
    if (!data) return [];

    const validCreatedAlbums = createdItems.filter(album => !deletedItems.includes(album.id));

    const validFetchedAlbums = data.filter(album => !deletedItems.includes(album.id));

    return [...validCreatedAlbums, ...validFetchedAlbums];
  }, [data, deletedItems, createdItems]);

  const handleAlbumDeletion = async (id: number) => {
    try {
      await deleteAlbum(id.toString());
      deleteItemLocally(id);
      alert(ALBUM_TEXTS.albumDeletedSuccess);
    } catch {
      alert(ALBUM_TEXTS.albumDeletedFailure);
    }
  };

  const handleAlbumCreation = async (albumTitle: string) => {
    try {
      const createdAlbum = await createAlbum({
        title: albumTitle,
        userId: selectedUser?.id ?? 0,
      });
      if (createdAlbum) {
        createItemLocally(createdAlbum);
      }
      alert(ALBUM_TEXTS.albumCreatedSuccess);
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
