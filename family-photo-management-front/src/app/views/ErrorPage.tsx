import { ErrorContainer } from './styles/ErrorPage.styled';
import { APP_TEXTS } from '../utils/constants';

const ErrorPage: React.FC = () => {
  return (
    <ErrorContainer>
      <p>{APP_TEXTS.errorMessage}</p>
    </ErrorContainer>
  );
};

export default ErrorPage;
