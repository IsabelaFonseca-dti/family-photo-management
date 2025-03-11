import { PhotosService } from '../services/photos.service';
import { ListPhotosDTOResponse } from '../dto/list-photos.dto';
import { CreatePhotoDTOPostRequest } from '../dto/create-photo.dto';
import { UpdatePhotoDTORequest } from '../dto/update-photo.dto';
export declare class PhotosController {
    private readonly photosService;
    constructor(photosService: PhotosService);
    findAll(): Promise<ListPhotosDTOResponse[]>;
    create(createPhotoDto: CreatePhotoDTOPostRequest): Promise<import("../dto/create-photo.dto").CreatePhotoDTOResponse>;
    update(id: string, updateAlbumDto: UpdatePhotoDTORequest): Promise<import("../dto/update-photo.dto").UpdatePhotoDTOResponse>;
    delete(id: string): Promise<boolean>;
}
