import { useMutation } from '@tanstack/react-query';
import photosManagerInstance from '../services';

export const usePhotoDeletion = () => {
  const {
    isError,
    isPending,
    mutateAsync: deletePhoto,
  } = useMutation({
    mutationFn: (photoId: string) => photosManagerInstance.deletePhoto(photoId),
  });

  return {
    deletePhoto,
    isError,
    isPending,
  };
};
