import { FC } from 'react';

import {
  ActionButton,
  ActionsContainer,
  CardContainer,
  CardSubtitle,
  CardTitle,
  DeleteButton,
} from './CardWithAction.styled';
import { FaTrash } from 'react-icons/fa';

export interface ICardWithActionProps {
  id: number;
  title: string;
  subtitle?: string;
  actionName?: string;
  deleteButton?: boolean;
  handleDelete?: (id: number) => void;
  onClick: () => void;
}

const CardWithAction: FC<ICardWithActionProps> = ({
  id,
  title,
  subtitle,
  actionName = 'See more',
  deleteButton = false,
  handleDelete,
  onClick,
}) => {
  const renderSubtitle = () => {
    if (subtitle) {
      return <CardSubtitle>{subtitle}</CardSubtitle>;
    }
    return null;
  };

  const renderDeleteButton = () => {
    if (deleteButton) {
      return <DeleteButton onClick={() => handleDelete?.(id)}>{<FaTrash />}</DeleteButton>;
    }
    return null;
  };

  return (
    <CardContainer>
      <CardTitle>{title}</CardTitle>
      {renderSubtitle()}
      <ActionsContainer>
        <ActionButton onClick={onClick}>{actionName}</ActionButton>
        {renderDeleteButton()}
      </ActionsContainer>
    </CardContainer>
  );
};

export default CardWithAction;
