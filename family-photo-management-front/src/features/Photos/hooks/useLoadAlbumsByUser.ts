import { useQuery } from '@tanstack/react-query';

import albumsManagerInstance from '../services';
import { AlbumQueriesEnum } from '../types/AlbumQueriesEnum';

const HOUR_TO_MS = 60 * 60 * 1000;

export const useLoadAlbumsByUser = (userId: string | undefined) => {
  const { data, isError, isPending, isFetching, refetch } = useQuery({
    queryKey: [AlbumQueriesEnum.LIST_ALBUMS, userId],
    queryFn: () => {
      return albumsManagerInstance.getAlbumsByUser(userId);
    },
    enabled: !!userId,
    staleTime: HOUR_TO_MS,
  });

  return {
    data,
    isError,
    isLoading: isPending || isFetching,
    refetch,
  };
};
