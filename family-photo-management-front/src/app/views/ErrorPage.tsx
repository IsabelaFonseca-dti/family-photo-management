import { BackButton } from '../../shared/components';
import { ErrorContainer } from './styles/ErrorPage.styled';
import { APP_TEXTS } from '../utils/constants';

const ErrorPage: React.FC = () => {
  return (
    <div>
      <BackButton />
      <ErrorContainer>
        <p>{APP_TEXTS.errorMessage}</p>
      </ErrorContainer>
    </div>
  );
};

export default ErrorPage;
