import { HttpService } from '@nestjs/axios';
import { ListUsersDTOResponse } from '../dto/list-users.dto';
import { ListAlbumsByUserDTOResponse } from '../dto/list-albums-by-user.dto';
export declare class UsersService {
    private readonly httpService;
    constructor(httpService: HttpService);
    findAll(): Promise<ListUsersDTOResponse[]>;
    findAlbumsByUser(userId: number): Promise<ListAlbumsByUserDTOResponse[]>;
}
