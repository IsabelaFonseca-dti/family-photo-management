import { Module } from '@nestjs/common';
import { GlobalHttpModule } from '../../core/global-http-module/global-http-module.module';
import { AlbumsService } from './services/albums.service';
import { AlbumsController } from './controllers/albums.controller';

@Module({
  imports: [GlobalHttpModule],
  controllers: [AlbumsController],
  providers: [AlbumsService],
})
export class AlbumsModule {}
