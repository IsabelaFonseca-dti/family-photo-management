import { FC, useState } from 'react';
import { Modal } from '../../../shared/components';
import {
  Form,
  ModalContent,
  SendFormButton,
  TitleInput,
  TitleInputContainer,
  FileInputContainer,
} from './styles/AddPhotosModal.styled';
import { PHOTOS_TEXTS } from '../utils/constants';

interface IAddPhotosModalProps {
  isOpen: boolean;
  onSubmit: (photoTitle: string) => void;
  onClose: () => void;
}

const AddPhotosModal: FC<IAddPhotosModalProps> = ({ isOpen, onSubmit, onClose }) => {
  const [photoTitle, setPhotoTitle] = useState<string>('');
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const isButtonDisabled = !photoTitle.trim() || !photoFile;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPhotoTitle('');
    setPhotoFile(null);
    onSubmit(photoTitle);
    onClose();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      setPhotoFile(e.target.files[0]);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <h2>{PHOTOS_TEXTS.addNewPhoto}</h2>
        <Form onSubmit={handleSubmit}>
          <TitleInputContainer>
            <label htmlFor="photo-title">{PHOTOS_TEXTS.photoTitle}</label>
            <TitleInput
              id="photo-title"
              type="text"
              value={photoTitle}
              onChange={e => setPhotoTitle(e.currentTarget.value)}
              placeholder={PHOTOS_TEXTS.photoTitlePlaceholder}
            />
          </TitleInputContainer>

          <FileInputContainer>
            <label htmlFor="photo-file">{PHOTOS_TEXTS.selectImage}</label>
            <input id="photo-file" type="file" accept="image/*" onChange={handleFileChange} />
          </FileInputContainer>

          <SendFormButton type="submit" disabled={isButtonDisabled} isDisabled={isButtonDisabled}>
            {PHOTOS_TEXTS.addPhotoButton}
          </SendFormButton>
        </Form>
      </ModalContent>
    </Modal>
  );
};

export default AddPhotosModal;
