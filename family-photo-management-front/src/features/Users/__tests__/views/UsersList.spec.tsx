import { vi, describe, it, beforeEach, expect } from 'vitest';

import { renderWithProviders, screen, UserEvent, userEvent } from '../../../../shared/testsSetup/tests-utils';
import UsersList from '../../views/UsersList';

import * as usersSliceModule from '../../../Users/hooks/useUsersSlice';
import * as loadUsersModule from '../../../Users/hooks/useLoadAllUsers';
import { MOCK_USERS } from '../mocks/user.mocks';
import { IListUserDTO } from '../../types/IListUserDTO';
import { USER_TEXTS } from '../../utils/constants';
import { MainRoutesEnum } from '../../../../app/types/MainRoutesEnum';

const mockedUseNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const mod = await vi.importActual<typeof import('react-router-dom')>('react-router-dom');
  return {
    ...mod,
    useNavigate: () => mockedUseNavigate,
  };
});

vi.mock('../../views/UsersTable', () => {
  return {
    default: ({ data, action }: { data: IListUserDTO[]; action: (user: IListUserDTO) => void }) => {
      return (
        <div>
          {data.map(user => (
            <div key={user.id}>
              <span>{user.username}</span>
              <button onClick={() => action(user)}>{`Select User-${user.username}`}</button>
            </div>
          ))}
        </div>
      );
    },
  };
});

describe('Tests on UsersList component', () => {
  let user: UserEvent;
  const mockSetSelectedUser = vi.fn();

  beforeAll(() => {
    user = userEvent.setup();
  });

  const mockUsersSlice = () => {
    vi.spyOn(usersSliceModule, 'useUsersSlice').mockReturnValue({
      selectedUser: null,
      setSelectedUser: mockSetSelectedUser,
    });
  };

  const mockUseLoadAllUsers = (data: IListUserDTO[] = MOCK_USERS, isLoading = false, isError = false) => {
    vi.spyOn(loadUsersModule, 'useLoadAllUsers').mockReturnValue({
      data,
      isLoading,
      isError,
      refetch: vi.fn(),
    });
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Testing rendering ', () => {
    it('Should render loading state while data is loading', () => {
      mockUsersSlice();
      mockUseLoadAllUsers([], true);

      renderWithProviders(<UsersList />);

      expect(screen.getByText(USER_TEXTS.loading)).toBeInTheDocument();
    });

    it('Should render list of users after data is loaded', () => {
      mockUsersSlice();
      mockUseLoadAllUsers();

      renderWithProviders(<UsersList />);

      MOCK_USERS.forEach(element => {
        expect(screen.getByText(element.username)).toBeInTheDocument();
      });
    });
  });

  describe('Testing actions', () => {
    it('Should navigate to the error page if there is an error while loading data', () => {
      mockUsersSlice();
      mockUseLoadAllUsers([], false, true);

      renderWithProviders(<UsersList />);

      expect(mockedUseNavigate).toHaveBeenCalledWith(`/${MainRoutesEnum.ERROR}`);
    });
    it('Should navigate to user details page when a user is selected', async () => {
      mockUsersSlice();
      mockUseLoadAllUsers();

      renderWithProviders(<UsersList />);

      const seeAlbumBtn = screen.getByText(`Select User-${MOCK_USERS[0].username}`);
      await user.click(seeAlbumBtn);

      expect(mockSetSelectedUser).toHaveBeenCalledWith(MOCK_USERS[0]);
      expect(mockedUseNavigate).toHaveBeenCalledWith(
        `/${MainRoutesEnum.USERS}/${MOCK_USERS[0].id}/${MainRoutesEnum.ALBUMS}`,
      );
    });

    it('Should update the filtered list based on search input', async () => {
      mockUsersSlice();
      mockUseLoadAllUsers();

      renderWithProviders(<UsersList />);

      const searchInput = screen.getByPlaceholderText('Filter by name or email');
      await user.type(searchInput, MOCK_USERS[0].email);

      expect(screen.getByText(MOCK_USERS[0].username)).toBeInTheDocument();
      expect(screen.queryByText(MOCK_USERS[1].username)).not.toBeInTheDocument();
    });
  });
});
