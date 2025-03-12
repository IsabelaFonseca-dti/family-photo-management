import styled from '@emotion/styled';
import { theme } from '../../theme/theme';

export const ActionButton = styled.button({
  width: '20%',
  padding: '5px',
  backgroundColor: `${theme.colorPalette.highlight}`,
  border: 'none',
  borderRadius: '8px',
  cursor: 'pointer',
  fontSize: '1rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '0.5rem',
});
