import { SetCallback } from '../../../shared/store/store';
import { IAlbumsByUserDTO } from '../types/IAlbumsByUserDTO';

export interface IAlbumsInitialState {
  deletedAlbums: Record<string, IAlbumsByUserDTO[]>;
  createdAlbums: Record<string, IAlbumsByUserDTO[]>;
  selectedAlbum: IAlbumsByUserDTO | null;
}

export type IAlbumsActions = ReturnType<typeof actions>;

const initialState: IAlbumsInitialState = {
  deletedAlbums: {},
  createdAlbums: {},
  selectedAlbum: null,
};

const actions = (set: SetCallback<IAlbumsInitialState>) => ({
  deleteAlbum: (userId: string, album: IAlbumsByUserDTO) =>
    set(state => {
      const currentItems = state.deletedAlbums[userId] || [];
      state.deletedAlbums[userId] = [...currentItems, album];
    }),

  createAlbum: (userId: string, album: IAlbumsByUserDTO) =>
    set(state => {
      const currentItems = state.createdAlbums[userId] || [];
      state.createdAlbums[userId] = [...currentItems, album];
    }),

  setSelectedAlbum: (selectedAlbum: IAlbumsInitialState['selectedAlbum']) =>
    set(state => {
      state.selectedAlbum = selectedAlbum;
    }),

  resetAlbumsSlice: () => set(() => initialState),
});

const slice = (set: SetCallback<IAlbumsInitialState>) => ({
  ...initialState,
  ...actions(set),
});

const albumsSlice = {
  slice,
  initialState,
};

export default albumsSlice;
