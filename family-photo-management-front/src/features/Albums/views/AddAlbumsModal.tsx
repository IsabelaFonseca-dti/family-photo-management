import { FC, useState } from 'react';
import { Modal } from '../../../shared/components';
import { Form, ModalContent, SendFormButton, TitleInput, TitleInputContainer } from './styles/AddAlbumsModal.styled';
import { ALBUM_TEXTS } from '../utils/constants';

interface IAddAlbumsModalProps {
  isOpen: boolean;
  onSubmit: (albumTitle: string) => void;
  onClose: () => void;
}

const AddAlbumsModal: FC<IAddAlbumsModalProps> = ({ isOpen, onSubmit, onClose }) => {
  const [albumTitle, setAlbumTitle] = useState<string>('');
  const isButtonDisabled = !albumTitle.trim();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setAlbumTitle('');
    onSubmit(albumTitle);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <h2>{ALBUM_TEXTS.addNewAlbum}</h2>
        <Form onSubmit={handleSubmit}>
          <TitleInputContainer>
            <label htmlFor="album-title">{ALBUM_TEXTS.albumTitleLabel}</label>
            <TitleInput
              id="album-title"
              type="text"
              value={albumTitle}
              onChange={e => setAlbumTitle(e.currentTarget.value)}
              placeholder={ALBUM_TEXTS.albumTitlePlaceholder}
            />
          </TitleInputContainer>
          <SendFormButton type="submit" disabled={isButtonDisabled} isDisabled={isButtonDisabled}>
            {ALBUM_TEXTS.addAlbumButton}
          </SendFormButton>
        </Form>
      </ModalContent>
    </Modal>
  );
};

export default AddAlbumsModal;
