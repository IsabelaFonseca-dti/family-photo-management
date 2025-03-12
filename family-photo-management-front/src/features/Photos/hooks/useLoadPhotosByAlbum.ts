import { useQuery } from '@tanstack/react-query';

import photosManagerInstance from '../services';
import { PhotosQueriesEnum } from '../types/PhotosQueriesEnum';

const HOUR_TO_MS = 60 * 60 * 1000;

export const useLoadPhotosByAlbum = (albumId: string | undefined) => {
  const { data, isError, isPending, isFetching, refetch } = useQuery({
    queryKey: [PhotosQueriesEnum.LIST_PHOTOS, albumId],
    queryFn: () => {
      return photosManagerInstance.getPhotosByAlbum(albumId);
    },
    enabled: !!albumId,
    staleTime: HOUR_TO_MS,
  });

  return {
    data,
    isError,
    isLoading: isPending || isFetching,
    refetch,
  };
};
