import { FC } from "react";
import { WEBSITE_NAME } from "../utils/constants";
import { Header, HeaderTitle } from "./styles/AppHeader.styled";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface IAppHeaderProps {}

const AppHeader: FC<IAppHeaderProps> = () => {
  return (
    <Header>
      <HeaderTitle>{WEBSITE_NAME}</HeaderTitle>
    </Header>
  );
};

export default AppHeader;
