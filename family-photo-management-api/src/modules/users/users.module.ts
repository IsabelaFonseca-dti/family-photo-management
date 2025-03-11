import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { UsersController } from './controllers/users.controller';
import { GlobalHttpModule } from '../../core/global-http-module/global-http-module.module';

@Module({
  imports: [GlobalHttpModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
