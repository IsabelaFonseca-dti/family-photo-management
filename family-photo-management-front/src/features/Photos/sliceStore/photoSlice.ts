import { SetCallback } from '../../../shared/store/store';
import { IListPhotoDTO } from '../types/IListPhotoDTO';

export interface IPhotosInitialState {
  deletedPhotos: number[];
  createdPhotos: IListPhotoDTO[];
  selectedPhoto: IListPhotoDTO | null;
}

export type IPhotosActions = ReturnType<typeof actions>;

const initialState: IPhotosInitialState = {
  deletedPhotos: [],
  createdPhotos: [],
  selectedPhoto: null,
};

const actions = (set: SetCallback<IPhotosInitialState>) => ({
  deletePhoto: (item: number) =>
    set(state => {
      state.deletedPhotos = [...state.deletedPhotos, item];
    }),

  createPhoto: (item: IListPhotoDTO) =>
    set(state => {
      state.createdPhotos = [...state.createdPhotos, item];
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
