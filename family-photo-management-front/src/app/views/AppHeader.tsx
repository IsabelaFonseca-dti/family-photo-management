import { FC } from 'react';
import { APP_TEXTS } from '../utils/constants';
import { Header, HeaderTitle } from './styles/AppHeader.styled';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface IAppHeaderProps {}

const AppHeader: FC<IAppHeaderProps> = () => {
  return (
    <Header>
      <HeaderTitle>{APP_TEXTS.headerAppName}</HeaderTitle>
    </Header>
  );
};

export default AppHeader;
