import { Module } from '@nestjs/common';
import { PhotosService } from './photos.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Photo } from './entities/photo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Photo])],
  controllers: [],
  providers: [PhotosService],
  exports: [PhotosService]
})
export class PhotosModule {}
