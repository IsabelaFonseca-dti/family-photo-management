import { useSliceAction, useSliceState } from '../../../shared/hooks/useStore';
import { IAlbumsActions, IAlbumsInitialState } from '../sliceStore/albumsSlice';

export const useAlbumsSlice = () => {
  const deletedAlbums = useSliceState<IAlbumsInitialState, 'deletedAlbums'>('deletedAlbums');

  const deleteAlbum = useSliceAction<IAlbumsActions, 'deleteAlbum'>('deleteAlbum');

  const createdAlbums = useSliceState<IAlbumsInitialState, 'createdAlbums'>('createdAlbums');

  const createAlbum = useSliceAction<IAlbumsActions, 'createAlbum'>('createAlbum');

  const selectedAlbum = useSliceState<IAlbumsInitialState, 'selectedAlbum'>('selectedAlbum');

  const setSelectedAlbum = useSliceAction<IAlbumsActions, 'setSelectedAlbum'>('setSelectedAlbum');

  return {
    deletedAlbums,
    deleteAlbumLocally: deleteAlbum,
    createdAlbums,
    createAlbumLocally: createAlbum,
    selectedAlbum,
    setSelectedAlbum,
  };
};
