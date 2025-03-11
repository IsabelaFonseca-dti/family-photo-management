import { Module } from '@nestjs/common';
import { GlobalHttpModule } from '../../core/global-http-module/global-http-module.module';
import { PhotosService } from './services/photos.service';
import { PhotosController } from './controllers/photos.controller';

@Module({
  imports: [GlobalHttpModule],
  controllers: [PhotosController],
  providers: [PhotosService],
})
export class PhotosModule {}
