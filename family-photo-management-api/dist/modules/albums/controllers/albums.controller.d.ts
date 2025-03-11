import { AlbumsService } from '../services/albums.service';
import { CreateAlbumDTOResponse, CreateAlbumDTORequest } from '../dto/create-album.dto';
import { UpdateAlbumDTOResponse, UpdateAlbumDTORequest } from '../dto/update-album.dto';
export declare class AlbumsController {
    private readonly albumsService;
    constructor(albumsService: AlbumsService);
    create(createAlbumDto: CreateAlbumDTORequest): Promise<CreateAlbumDTOResponse>;
    update(id: string, updateAlbumDto: UpdateAlbumDTORequest): Promise<UpdateAlbumDTOResponse>;
    delete(id: string): Promise<boolean>;
}
