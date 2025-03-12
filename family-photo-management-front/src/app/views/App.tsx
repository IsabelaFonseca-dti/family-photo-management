import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import UsersList from '../../features/Users/views/UsersList';
import AppHeader from './AppHeader';
import { MainContent, RootContent } from './styles/App.styled';
import { MainRoutesEnum } from '../types/MainRoutesEnum';
import AlbumsList from '../../features/Albums/views/AlbumsList';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import PhotosList from '../../features/Photos/views/PhotosList';
import ErrorPage from './ErrorPage';

const queryClient = new QueryClient();

function App() {
  return (
    <BrowserRouter>
      <RootContent>
        <AppHeader />
        <MainContent>
          <QueryClientProvider client={queryClient}>
            <Routes>
              <Route path={MainRoutesEnum.USERS} element={<UsersList />} />
              <Route path={`${MainRoutesEnum.USERS}/:userId/${MainRoutesEnum.ALBUMS}`} element={<AlbumsList />} />
              <Route
                path={`${MainRoutesEnum.USERS}/:userId/${MainRoutesEnum.ALBUMS}/:albumId/${MainRoutesEnum.PHOTOS}`}
                element={<PhotosList />}
              />
              <Route path={`${MainRoutesEnum.ERROR}`} element={<ErrorPage />} />
              <Route path="*" element={<Navigate to={MainRoutesEnum.USERS} replace />} />
            </Routes>
          </QueryClientProvider>
        </MainContent>
      </RootContent>
    </BrowserRouter>
  );
}

export default App;
