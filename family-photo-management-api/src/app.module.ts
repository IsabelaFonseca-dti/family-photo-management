import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { AlbumsModule } from './modules/albums/albums.module';
import { GlobalHttpModule } from './core/global-http-module/global-http-module.module';
import { PhotosModule } from './modules/photos/photos.module';

@Module({
  imports: [GlobalHttpModule, UsersModule, AlbumsModule, PhotosModule],
  exports: [],
})
export class AppModule {}
