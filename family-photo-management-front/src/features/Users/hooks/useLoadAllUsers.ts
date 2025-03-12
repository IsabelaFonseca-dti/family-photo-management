import { useQuery } from '@tanstack/react-query';

import usersManagerInstance from '../services';
import { UserQueriesEnum } from '../types/UsersQueriesEnum';

const HOUR_TO_MS = 60 * 60 * 1000;

export const useLoadAllUsers = () => {
  const { data, isError, isPending, isFetching, refetch } = useQuery({
    queryKey: [UserQueriesEnum.LIST_ALL],
    queryFn: () => {
      return usersManagerInstance.getUsers();
    },
    staleTime: HOUR_TO_MS,
  });

  return {
    data,
    isError,
    isLoading: isPending || isFetching,
    refetch,
  };
};
