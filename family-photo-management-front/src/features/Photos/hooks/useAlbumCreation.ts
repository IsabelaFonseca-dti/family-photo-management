import { useMutation } from '@tanstack/react-query';
import albumsManagerInstance from '../services';
import { IAlbumsCreationDTO } from '../types/IAlbumCreationDTO';

export const useAlbumCreation = () => {
  const {
    isError,
    isPending,
    mutateAsync: createAlbum,
  } = useMutation({
    mutationFn: (album: IAlbumsCreationDTO) => albumsManagerInstance.createAlbum(album),
  });

  return {
    createAlbum,
    isError,
    isPending,
  };
};
