import { FC } from "react";
import { MainContent } from "./styles/AlbumsList.styled";
import { CardWithAction } from "../../../shared/components";
import { useUsersSlice } from "../../Users/hooks/useUsersSlice";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface IAlbumsListProps {}

const AlbumsList: FC<IAlbumsListProps> = () => {
  const { selectedUser } = useUsersSlice();

  const mockUsersWithAlbums = [
    {
      userId: 1,
      id: 101,
      title: "Álbum 1 do Usuário 1",
    },
    {
      userId: 1,
      id: 102,
      title: "Álbum 2 do Usuário 1",
    },
    {
      userId: 2,
      id: 103,
      title: "Álbum 1 do Usuário 2",
    },
    {
      userId: 3,
      id: 104,
      title: "Álbum 1 do Usuário 3",
    },
    {
      userId: 4,
      id: 105,
      title: "Álbum 1 do Usuário 4",
    },
    {
      userId: 5,
      id: 106,
      title: "Álbum 1 do Usuário 5",
    },
  ];

  return (
    <MainContent>
      <h2>{selectedUser?.userName}</h2>
      {mockUsersWithAlbums.map((album) => {
        return (
          <CardWithAction
            title={album.title}
            onClick={() => {
              console.log("album");
            }}
          />
        );
      })}
    </MainContent>
  );
};

export default AlbumsList;
