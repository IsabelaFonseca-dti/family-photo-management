import { useMutation } from '@tanstack/react-query';
import photosManagerInstance from '../services';
import { IPhotoCreationDTO } from '../types/IPhotoCreationDTO';

export const usePhotoCreation = () => {
  const {
    isError,
    isPending,
    mutateAsync: postPhoto,
  } = useMutation({
    mutationFn: (photo: IPhotoCreationDTO) => photosManagerInstance.createPhoto(photo),
  });

  return {
    postPhoto,
    isError,
    isPending,
  };
};
