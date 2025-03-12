import { useSliceAction, useSliceState } from "../../../shared/hooks/useStore";
import { IUsersActions, IUsersInitialState } from "../sliceStore/usersSlice";

export const useUsersSlice = () => {
  const selectedUser = useSliceState<IUsersInitialState, "selectedUser">(
    "selectedUser"
  );

  const setSelectedUser = useSliceAction<IUsersActions, "setSelectedUser">(
    "setSelectedUser"
  );

  return {
    selectedUser,
    setSelectedUser,
  };
};
