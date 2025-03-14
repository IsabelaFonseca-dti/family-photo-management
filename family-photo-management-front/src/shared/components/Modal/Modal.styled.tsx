import styled from '@emotion/styled';

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
