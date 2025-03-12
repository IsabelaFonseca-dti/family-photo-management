import styled from '@emotion/styled';

export const UsersListContent = styled.section({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  gap: '1rem',
  width: '100%',
});

export const FilterContainer = styled.div({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});

export const FilterInput = styled.input({
  backgroundColor: 'white',
  borderRadius: '1rem',
  textAlign: 'center',
  width: '20%',
  height: '2rem',
  color: '#000',
});
