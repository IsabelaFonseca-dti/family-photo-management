import { useMutation } from '@tanstack/react-query';
import albumsManagerInstance from '../services';

export const useDeleteAlbum = () => {
  const {
    isError,
    isPending,
    mutateAsync: deleteAlbum,
  } = useMutation({
    mutationFn: (albumId: string) => albumsManagerInstance.deleteAlbum(albumId),
  });

  return {
    deleteAlbum,
    isError,
    isPending,
  };
};
