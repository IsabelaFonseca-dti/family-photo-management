import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { ActionButton } from './BackButton.styled';

const BackButton = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <ActionButton onClick={handleBack}>
      <FaArrowLeft /> Go Back
    </ActionButton>
  );
};

export default BackButton;
