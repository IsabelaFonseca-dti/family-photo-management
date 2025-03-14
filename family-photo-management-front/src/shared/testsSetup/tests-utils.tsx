import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RenderOptions, render } from '@testing-library/react';
import React, { ReactElement } from 'react';
import '@testing-library/jest-dom';

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return <QueryClientProvider client={new QueryClient()}>{children}</QueryClientProvider>;
};

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
  render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';
export * from '@testing-library/user-event';

export { customRender as renderWithProviders };
