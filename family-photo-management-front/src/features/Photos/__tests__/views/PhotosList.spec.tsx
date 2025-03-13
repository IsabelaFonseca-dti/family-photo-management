import { describe, it, vi, beforeEach, expect } from 'vitest';
import { renderWithProviders, screen, userEvent, UserEvent } from '../../../../shared/testsSetup/tests-utils';
import { MOCK_LIST_PHOTOS, MOCK_SELECTED_ALBUM, MOCK_SELECTED_USER } from '../mocks/photo.mocks';
import { IAlbumsByUserDTO } from '../../../Albums/types/IAlbumsByUserDTO';
import PhotosList from '../../views/PhotosList';
import { PHOTOS_TEXTS } from '../../utils/constants';
import * as usersSliceModule from '../../../Users/hooks/useUsersSlice';
import * as albumsSliceModule from '../../../Albums/hooks/useAlbumSlice';
import * as photoCreationModule from '../../hooks/usePhotoCreation';
import * as photoDeletionModule from '../../hooks/usePhotoDeletion';
import * as photoSliceModule from '../../hooks/usePhotosSlice';
import * as loadPhotoModule from '../../hooks/useLoadPhotosByAlbum';
import * as utils from '../../utils/photosUtils';
import { IListPhotoDTO } from '../../types/IListPhotoDTO';
import { IListUserDTO } from '../../../Users/types/IListUserDTO';
import { MainRoutesEnum } from '../../../../app/types/MainRoutesEnum';

vi.mock('../../../../shared/components/ImageSlider/ImageSlider', () => {
  return {
    default: ({
      images,
      onDelete,
    }: {
      images: { url: string; title: string }[];
      onDelete: (index: number, callback: () => void) => void;
    }) => {
      const handleDelete = (index: number) => {
        onDelete(index, () => console.log('Deleted image with index:', index));
      };

      return (
        <div data-testid="image-slider">
          image-slider
          {images.map((image, index) => (
            <div key={index}>
              <img src={image.url} alt={image.title} data-testid={`img-${image.title}`} />
              <button onClick={() => handleDelete(index)}>{`Delete-${index}`}</button>
            </div>
          ))}
        </div>
      );
    },
  };
});

vi.mock('../../views/AddPhotosModal', () => {
  return {
    default: ({
      isOpen = false,
      onSubmit = vi.fn(),
      onClose = vi.fn(),
    }: {
      isOpen?: boolean;
      onSubmit?: (photoTitle: string) => void;
      onClose?: () => void;
    }) => {
      if (!isOpen) return null;

      return (
        <div data-testid="add-photos-modal" className="open">
          <h2>Add New Photo</h2>
          <form
            onSubmit={e => {
              e.preventDefault();
              onSubmit('photo-title');
              onClose();
            }}
          >
            <input type="text" placeholder="Enter photo title" />
            <input type="file" />
            <button type="submit">Add Photo</button>
          </form>
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

describe('Tests on PhotoList component', () => {
  let user: UserEvent;
  const mockSetSelectedUser = vi.fn();
  const mockPostPhoto = vi.fn();
  const mockDeletePhoto = vi.fn();
  const mockDeletePhotoLocally = vi.fn();
  const mockCreatePhotoLocally = vi.fn();
  const randomURLMock = 'https://random.com';

  beforeAll(() => {
    user = userEvent.setup();
    vi.spyOn(utils, 'getRandomPhotoUrl').mockReturnValue(randomURLMock);
  });

  const mockUsersSlice = (selectedUser: IListUserDTO | null = MOCK_SELECTED_USER) => {
    vi.spyOn(usersSliceModule, 'useUsersSlice').mockReturnValue({
      selectedUser,
      setSelectedUser: mockSetSelectedUser,
    });
  };

  const mockAlbumSlice = (selectedAlbum: IAlbumsByUserDTO | null = MOCK_SELECTED_ALBUM) => {
    vi.spyOn(albumsSliceModule, 'useAlbumsSlice').mockReturnValue({
      selectedAlbum,
      deletedAlbums: {},
      deleteAlbumLocally: vi.fn(),
      createdAlbums: {},
      createAlbumLocally: vi.fn(),
      setSelectedAlbum: vi.fn(),
    });
  };

  const mockPhotosSlice = (deletedPhotos = {}, createdPhotos = {}) => {
    vi.spyOn(photoSliceModule, 'usePhotosSlice').mockReturnValue({
      deletePhotoLocally: mockDeletePhotoLocally,
      createPhotoLocally: mockCreatePhotoLocally,
      deletedPhotos,
      createdPhotos,
    });
  };

  const mockUseLoadPhotosByAlbum = (data: IListPhotoDTO[] = MOCK_LIST_PHOTOS, isLoading = false, isError = false) => {
    vi.spyOn(loadPhotoModule, 'useLoadPhotosByAlbum').mockReturnValue({
      data,
      isLoading,
      isError,
      refetch: vi.fn(),
    });
  };

  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(photoCreationModule, 'usePhotoCreation').mockReturnValue({
      postPhoto: mockPostPhoto,
      isError: false,
      isPending: false,
    });

    vi.spyOn(photoDeletionModule, 'usePhotoDeletion').mockReturnValue({
      deletePhoto: mockDeletePhoto,
      isError: false,
      isPending: false,
    });
  });

  describe('Testing rendering', () => {
    it('Should render page with the selected username, album and the image slider', () => {
      mockUsersSlice();
      mockAlbumSlice();
      mockPhotosSlice();
      mockUseLoadPhotosByAlbum();

      renderWithProviders(<PhotosList />);

      expect(
        screen.getByText(PHOTOS_TEXTS.userPhotos(MOCK_SELECTED_USER?.username, MOCK_SELECTED_USER?.email)),
      ).toBeInTheDocument();
      expect(screen.getByText('image-slider')).toBeInTheDocument();
    });

    it('Should render the empty page if data is empty', () => {
      mockUsersSlice();
      mockAlbumSlice();
      mockPhotosSlice();
      mockUseLoadPhotosByAlbum([], false, false);

      renderWithProviders(<PhotosList />);

      expect(screen.getByText(PHOTOS_TEXTS.emptyPhotoList)).toBeInTheDocument();
      expect(screen.queryByText('image-slider')).not.toBeInTheDocument();
    });

    it('Should render the loading component if data is loading', () => {
      mockUsersSlice();
      mockAlbumSlice();
      mockPhotosSlice();
      mockUseLoadPhotosByAlbum([], true, false);

      renderWithProviders(<PhotosList />);

      expect(screen.getByText(PHOTOS_TEXTS.loading)).toBeInTheDocument();
    });
  });

  describe('Testing actions', () => {
    it('Should navigate to the error page if there is an error while loading data', () => {
      mockUsersSlice();
      mockAlbumSlice();
      mockPhotosSlice();
      mockUseLoadPhotosByAlbum([], false, true);

      renderWithProviders(<PhotosList />);

      expect(mockedUseNavigate).toHaveBeenCalledWith(`/${MainRoutesEnum.ERROR}`);
    });
    it('Should navigate if there is no user selected', () => {
      mockUsersSlice(null);
      mockAlbumSlice();
      mockPhotosSlice();
      mockUseLoadPhotosByAlbum();

      renderWithProviders(<PhotosList />);

      expect(mockedUseNavigate).toHaveBeenCalledWith('/');
    });

    it('Should navigate if there is no album selected', () => {
      mockUsersSlice();
      mockAlbumSlice(null);
      mockPhotosSlice();
      mockUseLoadPhotosByAlbum();

      renderWithProviders(<PhotosList />);

      expect(mockedUseNavigate).toHaveBeenCalledWith('/');
    });

    it('Should open a modal if user clicks on add new photo', async () => {
      mockUsersSlice();
      mockAlbumSlice();
      mockPhotosSlice();
      mockUseLoadPhotosByAlbum();

      renderWithProviders(<PhotosList />);

      const addButton = screen.getByText(PHOTOS_TEXTS.addMore);
      await user.click(addButton);

      expect(screen.getByTestId('add-photos-modal')).toBeInTheDocument();
    });

    it('Should call the request to post a photo after submit the form on the modal', async () => {
      mockUsersSlice();
      mockAlbumSlice();
      mockPhotosSlice();
      mockUseLoadPhotosByAlbum();

      renderWithProviders(<PhotosList />);

      const addPhotoButton = screen.getByText(PHOTOS_TEXTS.addMore);
      await user.click(addPhotoButton);

      const submitFormButton = screen.getByText('Add Photo');
      await user.click(submitFormButton);

      expect(mockPostPhoto).toHaveBeenCalledWith({
        title: 'photo-title',
        albumId: MOCK_SELECTED_ALBUM?.id,
        thumbnailUrl: randomURLMock,
        url: randomURLMock,
      });

      expect(mockCreatePhotoLocally).toHaveBeenCalled();
      expect(screen.queryByTestId('add-photos-modal')).not.toBeInTheDocument();
    });

    it('Should call the request to delete a photo after user clicks on the delete button', async () => {
      mockUsersSlice();
      mockAlbumSlice();
      mockPhotosSlice();
      mockUseLoadPhotosByAlbum();

      renderWithProviders(<PhotosList />);

      const deletePhotoButton = screen.getByText('Delete-1');
      await user.click(deletePhotoButton);

      expect(mockDeletePhoto).toHaveBeenCalledWith(MOCK_LIST_PHOTOS[1].id.toString());

      expect(mockDeletePhotoLocally).toHaveBeenCalled();
    });
  });
});
