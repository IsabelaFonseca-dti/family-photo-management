import styled from '@emotion/styled';
import { theme } from '../../theme/theme';

export const SliderWrapper = styled.div({
  position: 'relative',
  width: '50%',
  height: '600px',
  margin: 'auto',
  '& img': {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
});

export const ImageContainer = styled.div({
  width: '100%',
  height: '100%',
});

export const ImageNotFound = styled.div({
  backgroundColor: `${theme.colorPalette.highlight}`,
  color: 'white',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export const SliderButton = styled.button<{ left?: boolean }>(({ left }) => ({
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  border: 'none',
  padding: '10px',
  color: '#fff',
  fontSize: '24px',
  cursor: 'pointer',
  zIndex: 10,
  left: left ? '10px' : undefined,
  right: left ? undefined : '10px',

  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
}));

export const DeleteButton = styled.button({
  position: 'absolute',
  top: '10px',
  right: '10px',
  backgroundColor: 'red',
  color: 'white',
  border: 'none',
  padding: '0.8rem',
  borderRadius: '50%',
  cursor: 'pointer',
  zIndex: 10,

  '&:hover': {
    backgroundColor: 'darkred',
  },
});
