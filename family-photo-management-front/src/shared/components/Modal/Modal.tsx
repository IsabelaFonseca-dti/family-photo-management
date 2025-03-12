import { FC, ReactNode } from 'react';
import styled from '@emotion/styled';

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

// Styled Components no seu padrão
export const Backdrop = styled.div({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  background: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1000,
});

export const ModalContent = styled.div({
  background: 'white',
  padding: '20px',
  borderRadius: '8px',
  position: 'relative',
  width: '400px',
  maxWidth: '90%',
  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
  color: '#000',
});

export const CloseButton = styled.button({
  position: 'absolute',
  top: '10px',
  right: '15px',
  background: 'none',
  border: 'none',
  fontSize: '1.5rem',
  cursor: 'pointer',
});
