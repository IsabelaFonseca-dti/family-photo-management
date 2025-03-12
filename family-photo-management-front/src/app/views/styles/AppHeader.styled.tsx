import styled from '@emotion/styled';
import { theme } from '../../../shared/theme/theme';

export const Header = styled.header({
  width: '100%',
  height: '100px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: `${theme.colorPalette.accentSecondary}`,
});

export const HeaderTitle = styled.h1({
  fontFamily: 'Inter , sans-serif',
  fontSize: '2.5rem',
  fontWeight: 700,
  letterSpacing: '1px',
  textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
});
