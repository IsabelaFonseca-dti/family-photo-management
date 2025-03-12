import styled from '@emotion/styled';
import { theme } from '../../../../shared/theme/theme';

export const AlbumsListContainer = styled.section({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  gap: '2rem',
});

export const GridContainer = styled.section({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: '1rem',
  alignSelf: 'center',

  '@media (max-width: 1200px)': {
    gridTemplateColumns: 'repeat(2, 1fr)',
  },

  '@media (max-width: 768px)': {
    gridTemplateColumns: '1fr',
  },
});
export const ActionsContainer = styled.div({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});

export const AddMoreButton = styled.button({
  width: '20%',
  padding: '0.5rem',
  backgroundColor: `${theme.colorPalette.accent}`,
  border: 'none',
  borderRadius: '8px',
  cursor: 'pointer',
  fontSize: '1rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '0.5rem',
  maxHeight: '40px',
});
