import styled from '@emotion/styled';
import { theme } from '../../../../shared/theme/theme';

export const ModalContent = styled.div({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  gap: '2rem',
});

export const Form = styled.form({
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
});

export const TitleInputContainer = styled.div({
  display: 'flex',
  flexDirection: 'row',
  gap: '0.5rem',
});

export const TitleInput = styled.input({
  backgroundColor: 'white',
  textAlign: 'center',
  color: '#000',
  padding: '10px',
  borderRadius: '4px',
  border: '1px solid #ccc',
  fontSize: '1rem',
  width: '100%',
});

export const FileInputContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem',
});

export const FileInput = styled.input({
  padding: '10px',
  fontSize: '1rem',
  border: '1px solid #ccc',
  borderRadius: '4px',
  width: '100%',
});

export const SendFormButton = styled.button<{ isDisabled?: boolean }>(({ isDisabled }) => ({
  width: '100%',
  padding: '10px',
  backgroundColor: isDisabled ? '#ccc' : theme.colorPalette.accentSecondary,
  color: '#fff',
  border: 'none',
  borderRadius: '4px',
  cursor: isDisabled ? 'not-allowed' : 'pointer',
  fontSize: '1rem',
  transition: 'background-color 0.3s, opacity 0.3s',
  opacity: isDisabled ? 0.6 : 1,

  '&:hover': {
    opacity: isDisabled ? 0.6 : 0.8,
  },
}));
