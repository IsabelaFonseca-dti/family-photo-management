import { useStore as zustandUseStore } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { createStore } from 'zustand/vanilla';
import usersSlice, { IUsersActions, IUsersInitialState } from '../../features/Users/sliceStore/usersSlice';
import albumsSlice, { IAlbumsActions, IAlbumsInitialState } from '../../features/Albums/sliceStore/albumsSlice';
import photosSlice, { IPhotosActions, IPhotosInitialState } from '../../features/Photos/sliceStore/photoSlice';

export type TGlobalInitialState = IUsersInitialState & IAlbumsInitialState & IPhotosInitialState;

export type TGlobalActions = IUsersActions & IAlbumsActions & IPhotosActions;

export type Store = ReturnType<(typeof slices)['usersSlice']> &
  ReturnType<(typeof slices)['albumsSlice']> &
  ReturnType<(typeof slices)['photosSlice']>;

export type StateCallback = (state: TGlobalInitialState) => TGlobalInitialState;

export type SetCallback<T> = (set: (state: T) => void) => void;

export const slices = {
  usersSlice: usersSlice.slice,
  albumsSlice: albumsSlice.slice,
  photosSlice: photosSlice.slice,
};

export const vanillaStore = createStore(
  immer<Store>(set => ({
    ...usersSlice.slice(set as SetCallback<IUsersInitialState>),
    ...albumsSlice.slice(set as SetCallback<IAlbumsInitialState>),
    ...photosSlice.slice(set as SetCallback<IPhotosInitialState>),
  })),
);

export const useStore = zustandUseStore;
