import { UsersService } from '../services/users.service';
import { ListUsersDTOResponse } from '../dto/list-users.dto';
import { ListAlbumsByUserDTOResponse } from '../dto/list-albums-by-user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    findAll(): Promise<ListUsersDTOResponse[]>;
    findOne(id: string): Promise<ListAlbumsByUserDTOResponse[]>;
}
