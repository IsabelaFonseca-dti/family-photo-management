import { Controller, Get, Param, UsePipes, ValidationPipe } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { ListUsersDTOResponse } from '../dto/list-users.dto';
import { ListAlbumsByUserDTOResponse } from '../dto/list-albums-by-user.dto';
import { IdParamDTO } from '../../../utils';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll(): Promise<ListUsersDTOResponse[]> {
    return this.usersService.findAll();
  }

  @Get(':id/albums')
  @UsePipes(new ValidationPipe({ transform: true }))
  findOne(@Param('id') params: IdParamDTO): Promise<ListAlbumsByUserDTOResponse[]> {
    const { id } = params;
    return this.usersService.findAlbumsByUser(id);
  }
}
