import { FC, useMemo, useState } from 'react';
import { ActionsContainer, AddMoreButton, GridContainer, MainContent } from './styles/AlbumsList.styled';
import { BackButton, CardWithAction } from '../../../shared/components';
import { useUsersSlice } from '../../Users/hooks/useUsersSlice';
import { useLoadAlbumsByUser } from '../hooks/useLoadAlbumsByUser';
import { FaPlus } from 'react-icons/fa';
import { useAlbumsSlice } from '../hooks/useAlbumSlice';
import { useNavigate } from 'react-router-dom';
import { MainRoutesEnum } from '../../../app/types/MainRoutesEnum';
import { useDeleteAlbum } from '../hooks/useLoadDeleteAlbum';
import AddAlbumsModal from './AddAlbumsModal';
import { useAlbumCreation } from '../hooks/useAlbumCreation';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface IAlbumsListProps {}

const AlbumsList: FC<IAlbumsListProps> = () => {
  const { selectedUser } = useUsersSlice();
  const { deletedItems, deleteItemLocally, createItemLocally, createdItems } = useAlbumsSlice();
  const { deleteAlbum } = useDeleteAlbum();
  const { createAlbum } = useAlbumCreation();
  const { data, isLoading } = useLoadAlbumsByUser(selectedUser?.id.toString() ?? undefined);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  if (!selectedUser) {
    navigate(`/${MainRoutesEnum.USERS}`);
  }

  const filteredAlbums = useMemo(() => {
    if (!data) return [];

    const albumsWithoutDeleted = data.filter(album => !deletedItems.includes(album.id));

    return [...createdItems, ...albumsWithoutDeleted];
  }, [data, deletedItems, createdItems]);

  const handleAlbumDeletion = async (id: number) => {
    try {
      await deleteAlbum(id.toString());
      deleteItemLocally(id);
      alert('Album was deleted successfully');
    } catch {
      alert('Album could not be deleted');
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
      alert('Album was created successfully');
    } catch {
      alert('Album could not be created');
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
            <h2>{`List of ${selectedUser?.username}'s (${selectedUser?.email}) Albums`}</h2>
            <AddMoreButton onClick={() => setIsOpen(true)}>
              <FaPlus /> Add More
            </AddMoreButton>
          </ActionsContainer>

          <GridContainer>
            {filteredAlbums.map((album, index) => {
              return (
                <CardWithAction
                  id={album.id}
                  key={`card-album-${index}`}
                  title={album.title}
                  deleteButton
                  handleDelete={handleAlbumDeletion}
                  onClick={() => {
                    console.log('album');
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
      <MainContent>{renderContent()}</MainContent>
      <AddAlbumsModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSubmit={(albumTitle: string) => handleAlbumCreation(albumTitle)}
      />
    </>
  );
};

export default AlbumsList;
