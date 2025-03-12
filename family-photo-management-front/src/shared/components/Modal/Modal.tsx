import { FC, ReactNode } from 'react';
import { Backdrop, CloseButton, ModalContent } from './Modal.styled';

interface IModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Modal: FC<IModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <Backdrop onClick={onClose}>
      <ModalContent onClick={e => e.stopPropagation()}>
        {children}
        <CloseButton onClick={onClose}>×</CloseButton>
      </ModalContent>
    </Backdrop>
  );
};

export default Modal;
