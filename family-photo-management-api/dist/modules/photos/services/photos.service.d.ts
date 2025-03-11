import { CreatePhotoDTOResponse, CreatePhotoDTOPostRequest } from '../dto/create-photo.dto';
import { UpdatePhotoDTOResponse, UpdatePhotoDTORequest } from '../dto/update-photo.dto';
import { HttpService } from '@nestjs/axios';
import { ListPhotosDTOResponse } from '../dto/list-photos.dto';
export declare class PhotosService {
    private readonly httpService;
    constructor(httpService: HttpService);
    findAll(): Promise<ListPhotosDTOResponse[]>;
    create(createPhotoDto: CreatePhotoDTOPostRequest): Promise<CreatePhotoDTOResponse>;
    update(photoId: number, updatePhotoDto: UpdatePhotoDTORequest): Promise<UpdatePhotoDTOResponse>;
    delete(photoId: number): Promise<boolean>;
}
