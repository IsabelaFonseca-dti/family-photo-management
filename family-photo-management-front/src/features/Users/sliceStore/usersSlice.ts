import { SetCallback } from "../../../shared/store/store";
import { IListUserDTO } from "../types/IListUserDTO";

export interface IUsersInitialState {
  selectedUser: IListUserDTO | null;
}

export type IUsersActions = ReturnType<typeof actions>;

const initialState: IUsersInitialState = {
  selectedUser: null,
};

const actions = (set: SetCallback<IUsersInitialState>) => ({
  setSelectedUser: (selectedUser: IUsersInitialState["selectedUser"]) =>
    set((state) => {
      state.selectedUser = selectedUser;
    }),

  resetUsersSlice: () => set(() => initialState),
});

const slice = (set: SetCallback<IUsersInitialState>) => ({
  ...initialState,
  ...actions(set),
});

const usersSlice = {
  slice,
  initialState,
};

export default usersSlice;
