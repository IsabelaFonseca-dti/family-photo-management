import { SetCallback } from '../../../shared/store/store';
import { IListPhotoDTO } from '../types/IListPhotoDTO';

export interface IPhotosInitialState {
  deletedPhotos: Record<string, IListPhotoDTO[]>;
  createdPhotos: Record<string, IListPhotoDTO[]>;
  selectedPhoto: IListPhotoDTO | null;
}

export type IPhotosActions = ReturnType<typeof actions>;

const initialState: IPhotosInitialState = {
  deletedPhotos: {},
  createdPhotos: {},
  selectedPhoto: null,
};

const actions = (set: SetCallback<IPhotosInitialState>) => ({
  deletePhoto: (albumId: string, photo: IListPhotoDTO) =>
    set(state => {
      const currentPhotos = state.deletedPhotos[albumId] || [];
      state.deletedPhotos[albumId] = [...currentPhotos, photo];
    }),

  createPhoto: (albumId: string, photo: IListPhotoDTO) =>
    set(state => {
      const currentPhotos = state.createdPhotos[albumId] || [];
      state.createdPhotos[albumId] = [...currentPhotos, photo];
    }),

  setSelectedPhoto: (selectedPhoto: IPhotosInitialState['selectedPhoto']) =>
    set(state => {
      state.selectedPhoto = selectedPhoto;
    }),

  resetPhotosSlice: () => set(() => initialState),
});

const slice = (set: SetCallback<IPhotosInitialState>) => ({
  ...initialState,
  ...actions(set),
});

const photosSlice = {
  slice,
  initialState,
};

export default photosSlice;
