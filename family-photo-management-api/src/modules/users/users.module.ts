import { Module } from '@nestjs/common';
import { GlobalHttpModule } from '../../core/global-http-module/global-http-module.module';
import { UsersService } from './services/users.service';
import { UsersController } from './controllers/users.controller';

@Module({
  imports: [GlobalHttpModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
