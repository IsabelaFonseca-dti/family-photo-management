import { describe, it } from 'vitest';
import { renderWithProviders, screen } from '../../../shared/testsSetup/tests-utils';
import { APP_TEXTS } from '../../utils/constants';
import AppHeader from '../../views/AppHeader';

describe('Tests on AppHeader', () => {
  it('should render the header with the correct app name', () => {
    renderWithProviders(<AppHeader />);

    expect(screen.getByText(APP_TEXTS.headerAppName)).toBeInTheDocument();
  });
});
