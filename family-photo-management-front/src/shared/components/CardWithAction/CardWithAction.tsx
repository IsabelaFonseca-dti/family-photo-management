import { FC } from "react";

import {
  ActionButton,
  CardContainer,
  CardSubtitle,
  CardTitle,
} from "./CardWithAction.styled";

export interface ICardWithActionProps {
  title: string;
  subtitle?: string;
  actionName?: string;
  onClick: () => void;
}

const CardWithAction: FC<ICardWithActionProps> = ({
  title,
  subtitle,
  actionName = "See more",
  onClick,
}) => {
  const renderSubtitle = () => {
    if (subtitle) {
      return <CardSubtitle>{subtitle}</CardSubtitle>;
    }
    return null;
  };

  return (
    <CardContainer>
      <CardTitle>{title}</CardTitle>
      {renderSubtitle()}
      <ActionButton onClick={onClick}>{actionName}</ActionButton>
    </CardContainer>
  );
};

export default CardWithAction;
