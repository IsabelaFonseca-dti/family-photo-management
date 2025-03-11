import { HttpService } from '@nestjs/axios';
import { CreateAlbumDTOResponse, CreateAlbumDTORequest } from '../dto/create-album.dto';
import { UpdateAlbumDTOResponse, UpdateAlbumDTORequest } from '../dto/update-album.dto';
export declare class AlbumsService {
    private readonly httpService;
    constructor(httpService: HttpService);
    create(createAlbumDto: CreateAlbumDTORequest): Promise<CreateAlbumDTOResponse>;
    update(albumId: number, updateAlbumDto: UpdateAlbumDTORequest): Promise<UpdateAlbumDTOResponse>;
    delete(albumId: number): Promise<boolean>;
}
