import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import UsersList from "../../features/Users/views/UsersList";
import AppHeader from "./AppHeader";
import { RootContent } from "./styles/App.styled";
import { MainRoutesEnum } from "../types/MainRoutesEnum";
import AlbumsList from "../../features/Albums/views/AlbumsList";

function App() {
  return (
    <BrowserRouter>
      <RootContent>
        <AppHeader />
        <div style={{ flex: 1, padding: "2rem" }}>
          <Routes>
            <Route path={MainRoutesEnum.USERS} element={<UsersList />} />
            <Route
              path={`${MainRoutesEnum.USERS}/:userId/${MainRoutesEnum.ALBUMS}`}
              element={<AlbumsList />}
            />
            <Route
              path={`${MainRoutesEnum.USERS}/:userId/${MainRoutesEnum.ALBUMS}:albumId/${MainRoutesEnum.PHOTOS}`}
              element={<UsersList />}
            />
            <Route
              path="*"
              element={<Navigate to={MainRoutesEnum.USERS} replace />}
            />
          </Routes>
        </div>
      </RootContent>
    </BrowserRouter>
  );
}

export default App;
