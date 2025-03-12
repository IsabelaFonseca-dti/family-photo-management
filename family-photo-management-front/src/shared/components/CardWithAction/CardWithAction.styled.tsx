import styled from '@emotion/styled';
import { theme } from '../../theme/theme';

export const CardContainer = styled.div({
  width: '200px',
  padding: '1rem ',
  border: '1px solid #ccc',
  borderRadius: '8px',
  display: 'flex',
  flexDirection: 'column',
  height: 'auto',
  backgroundColor: `${theme.colorPalette.contrast}`,
  color: `${theme.colorPalette.primary}`,
  gap: '1rem',
  justifyContent: 'space-between',
});

export const CardTitle = styled.h3({
  fontSize: '1.5rem',
});

export const CardSubtitle = styled.p({
  fontSize: '1rem',
});

export const ActionsContainer = styled.div({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  gap: '1rem',
});

export const ActionButton = styled.button({
  width: '100%',
  padding: '10px',
  backgroundColor: `${theme.colorPalette.accentSecondary}`,
  color: '#fff',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize: '1rem',
});

export const DeleteButton = styled.button({
  padding: '10px',
  backgroundColor: `red`,
  color: '#fff',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize: '1rem',
});
