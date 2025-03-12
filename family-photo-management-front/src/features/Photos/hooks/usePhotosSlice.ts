import { useSliceAction, useSliceState } from '../../../shared/hooks/useStore';
import { IPhotosActions, IPhotosInitialState } from '../sliceStore/photoSlice';

export const usePhotosSlice = () => {
  const deletedPhotos = useSliceState<IPhotosInitialState, 'deletedPhotos'>('deletedPhotos');

  const deletePhoto = useSliceAction<IPhotosActions, 'deletePhoto'>('deletePhoto');

  const createdPhotos = useSliceState<IPhotosInitialState, 'createdPhotos'>('createdPhotos');

  const createPhoto = useSliceAction<IPhotosActions, 'createPhoto'>('createPhoto');

  return {
    deletedPhotos,
    deletePhotoLocally: deletePhoto,
    createdPhotos,
    createPhotoLocally: createPhoto,
  };
};
