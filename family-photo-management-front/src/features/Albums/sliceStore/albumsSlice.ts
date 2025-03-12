import { SetCallback } from '../../../shared/store/store';
import { IAlbumsByUserDTO } from '../types/IAlbumsByUserDTO';

export interface IAlbumsInitialState {
  deletedItems: number[];
  createdItems: IAlbumsByUserDTO[];
}

export type IAlbumsActions = ReturnType<typeof actions>;

const initialState: IAlbumsInitialState = {
  deletedItems: [],
  createdItems: [],
};

const actions = (set: SetCallback<IAlbumsInitialState>) => ({
  deleteItem: (item: number) =>
    set(state => {
      state.deletedItems = [...state.deletedItems, item];
    }),

  createItem: (item: IAlbumsByUserDTO) =>
    set(state => {
      state.createdItems = [...state.createdItems, item];
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
