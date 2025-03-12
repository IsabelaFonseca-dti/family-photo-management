import styled from '@emotion/styled';

export const SliderWrapper = styled.div({
  position: 'relative',
  width: '50%',
  height: '50%',
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
  overflow: 'hidden',
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
