import styled from '@emotion/styled';
import { theme } from '../../../../shared/theme/theme';

export const MainContent = styled.main({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  gap: '2rem',
});

export const GridContainer = styled.section({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: '1rem',
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
