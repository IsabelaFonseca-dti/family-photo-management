import { describe, it, vi, beforeEach, expect } from 'vitest';
import { renderWithProviders, screen, userEvent, UserEvent } from '../../../../shared/testsSetup/tests-utils';
import { MOCK_ALBUMS, MOCK_SELECTED_ALBUM, MOCK_SELECTED_USER } from '../mocks/album.mock';
import AlbumsList from '../../views/AlbumsList';
import { ALBUM_TEXTS } from '../../utils/constants';
import * as usersSliceModule from '../../../Users/hooks/useUsersSlice';
import * as albumsSliceModule from '../../hooks/useAlbumSlice';
import * as albumCreationModule from '../../hooks/useAlbumCreation';
import * as albumDeletionModule from '../../hooks/useAlbumDeletion';
import * as loadAlbumModule from '../../hooks/useLoadAlbumsByUser';
import { IAlbumsByUserDTO } from '../../types/IAlbumsByUserDTO';
import { MainRoutesEnum } from '../../../../app/types/MainRoutesEnum';
import { IListUserDTO } from '../../../Users/types/IListUserDTO';

vi.mock('../../views/AddAlbumsModal', () => {
  return {
    default: ({
      isOpen = false,
      onSubmit = vi.fn(),
      onClose = vi.fn(),
    }: {
      isOpen?: boolean;
      onSubmit?: (albumTitle: string) => void;
      onClose?: () => void;
    }) => {
      if (!isOpen) return null;

      return (
        <div data-testid="add-albums-modal" className="open">
          <h2>Add New Album</h2>
          <form
            onSubmit={e => {
              e.preventDefault();
              onSubmit('album-title');
              onClose();
            }}
          >
            <input type="text" placeholder="Enter album title" />
            <button type="submit">Add Album</button>
          </form>
        </div>
      );
    },
  };
});

vi.mock('../../../../shared/components/CardWithAction/CardWithAction', () => {
  return {
    default: ({
      id,
      title,
      handleDelete,
      onClick,
    }: {
      id: number;
      title: string;
      actionName: string;
      deleteButton: boolean;
      handleDelete: (id: number) => void;
      onClick: () => void;
    }) => {
      return (
        <div data-testid={`card-album-${id}`} key={`card-album-${id}`}>
          <h3>{title}</h3>

          <button data-testid={`delete-album-${id}`} onClick={() => handleDelete(id)}>
            {`delete-${id}`}
          </button>

          <button data-testid={`select-album-${id}`} onClick={onClick}>
            {`action-${id}`}
          </button>
        </div>
      );
    },
  };
});

const mockedUseNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const mod = await vi.importActual<typeof import('react-router-dom')>('react-router-dom');
  return {
    ...mod,
    useNavigate: () => mockedUseNavigate,
  };
});

describe('Tests on AlbumsList component', () => {
  let user: UserEvent;
  const mockSetSelectedAlbum = vi.fn();
  const mockPostAlbum = vi.fn();
  const mockDeleteAlbum = vi.fn();
  const mockDeleteAlbumLocally = vi.fn();
  const mockCreateAlbumLocally = vi.fn();

  beforeAll(() => {
    user = userEvent.setup();
  });

  const mockUsersSlice = (selectedUser: IListUserDTO | null = MOCK_SELECTED_USER) => {
    vi.spyOn(usersSliceModule, 'useUsersSlice').mockReturnValue({
      selectedUser,
      setSelectedUser: vi.fn(),
    });
  };

  const mockAlbumSlice = (selectedAlbum: IAlbumsByUserDTO = MOCK_SELECTED_ALBUM) => {
    vi.spyOn(albumsSliceModule, 'useAlbumsSlice').mockReturnValue({
      deletedAlbums: {},
      deleteAlbumLocally: mockDeleteAlbumLocally,
      createdAlbums: {},
      createAlbumLocally: mockCreateAlbumLocally,
      setSelectedAlbum: mockSetSelectedAlbum,
      selectedAlbum,
    });
  };

  const mockUseLoadAlbumsByUser = (data: IAlbumsByUserDTO[] = MOCK_ALBUMS, isLoading = false, isError = false) => {
    vi.spyOn(loadAlbumModule, 'useLoadAlbumsByUser').mockReturnValue({
      data,
      isLoading,
      isError,
      refetch: vi.fn(),
    });
  };

  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(albumCreationModule, 'useAlbumCreation').mockReturnValue({
      createAlbum: mockPostAlbum,
      isError: false,
      isPending: false,
    });

    vi.spyOn(albumDeletionModule, 'useAlbumDeletion').mockReturnValue({
      deleteAlbum: mockDeleteAlbum,
      isError: false,
      isPending: false,
    });
  });

  describe('Testing rendering', () => {
    it('Should render page with the selected username, album list, and add button', () => {
      mockUsersSlice();
      mockAlbumSlice();
      mockUseLoadAlbumsByUser();

      renderWithProviders(<AlbumsList />);

      expect(
        screen.getByText(
          `${ALBUM_TEXTS.listOfAlbums} ${MOCK_SELECTED_USER?.username}'s (${MOCK_SELECTED_USER?.email})`,
        ),
      ).toBeInTheDocument();

      MOCK_ALBUMS.forEach(element => {
        expect(screen.getByText(element.title)).toBeInTheDocument();
      });
      expect(screen.getByText(ALBUM_TEXTS.addMore)).toBeInTheDocument();
    });

    it('Should render the loading component if data is loading', () => {
      mockUsersSlice();
      mockAlbumSlice();
      mockUseLoadAlbumsByUser([], true, false);

      renderWithProviders(<AlbumsList />);

      expect(screen.getByText(ALBUM_TEXTS.loading)).toBeInTheDocument();
    });
  });

  describe('Testing actions', () => {
    it('Should navigate to the error page if there is an error while loading albums', () => {
      mockUsersSlice();
      mockAlbumSlice();
      mockUseLoadAlbumsByUser([], false, true);

      renderWithProviders(<AlbumsList />);

      expect(mockedUseNavigate).toHaveBeenCalledWith(`/${MainRoutesEnum.ERROR}`);
    });

    it('Should navigate if there is no user selected', () => {
      mockUsersSlice(null);
      mockAlbumSlice();
      mockUseLoadAlbumsByUser();

      renderWithProviders(<AlbumsList />);

      expect(mockedUseNavigate).toHaveBeenCalledWith('/');
    });

    it('Should open a modal if user clicks on add new album', async () => {
      mockUsersSlice();
      mockAlbumSlice();
      mockUseLoadAlbumsByUser();

      renderWithProviders(<AlbumsList />);

      const addButton = screen.getByText(ALBUM_TEXTS.addMore);
      await user.click(addButton);
      expect(screen.getByTestId('add-albums-modal')).toBeInTheDocument();
    });

    it('Should call the request to create a new album after submit the form on the modal', async () => {
      mockUsersSlice();
      mockAlbumSlice();
      mockUseLoadAlbumsByUser();

      renderWithProviders(<AlbumsList />);

      const addAlbumButton = screen.getByText(ALBUM_TEXTS.addMore);
      await user.click(addAlbumButton);
      const submitFormButton = screen.getByText('Add Album');
      await user.click(submitFormButton);

      expect(mockPostAlbum).toHaveBeenCalledWith({
        title: 'album-title',
        userId: MOCK_SELECTED_USER?.id,
      });

      expect(mockCreateAlbumLocally).toHaveBeenCalled();
      expect(screen.queryByTestId('add-albums-modal')).not.toBeInTheDocument();
    });

    it('Should call the request to delete an album after user clicks on the delete button', async () => {
      mockUsersSlice();
      mockAlbumSlice();
      mockUseLoadAlbumsByUser();

      renderWithProviders(<AlbumsList />);

      const deleteAlbumButton = screen.getByText(`delete-${MOCK_ALBUMS[0].id}`);
      await user.click(deleteAlbumButton);

      expect(mockDeleteAlbum).toHaveBeenCalledWith(MOCK_ALBUMS[0].id.toString());
      expect(mockDeleteAlbumLocally).toHaveBeenCalled();
    });

    it('Should navigate to the photos page', async () => {
      mockUsersSlice();
      mockAlbumSlice();
      mockUseLoadAlbumsByUser();

      renderWithProviders(<AlbumsList />);

      const seeAlbumBtn = screen.getByText(`action-${MOCK_ALBUMS[0].id}`);
      await user.click(seeAlbumBtn);

      expect(mockSetSelectedAlbum).toHaveBeenCalledWith(MOCK_ALBUMS[0]);
      expect(mockedUseNavigate).toHaveBeenCalledWith(
        `/${MainRoutesEnum.USERS}/${MOCK_SELECTED_USER.id}/${MainRoutesEnum.ALBUMS}/${MOCK_ALBUMS[0].id}/${MainRoutesEnum.PHOTOS}`,
      );
    });
  });
});
