import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import UsersList from '../../features/Users/views/UsersList';
import AppHeader from './AppHeader';
import { RootContent } from './styles/App.styled';
import { MainRoutesEnum } from '../types/MainRoutesEnum';
import AlbumsList from '../../features/Albums/views/AlbumsList';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {
  return (
    <BrowserRouter>
      <RootContent>
        <AppHeader />
        <div style={{ flex: 1, padding: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <QueryClientProvider client={queryClient}>
            <Routes>
              <Route path={'/teste'} element={<UsersList />} />
              <Route path={MainRoutesEnum.USERS} element={<UsersList />} />
              <Route path={`${MainRoutesEnum.USERS}/:userId/${MainRoutesEnum.ALBUMS}`} element={<AlbumsList />} />
              <Route
                path={`${MainRoutesEnum.USERS}/:userId/${MainRoutesEnum.ALBUMS}:albumId/${MainRoutesEnum.PHOTOS}`}
                element={<UsersList />}
              />
              <Route path="*" element={<Navigate to={MainRoutesEnum.USERS} replace />} />
            </Routes>
          </QueryClientProvider>
        </div>
      </RootContent>
    </BrowserRouter>
  );
}

export default App;
