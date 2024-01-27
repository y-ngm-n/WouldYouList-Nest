import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Photo } from './entities/photo.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PhotosService {
  constructor(
    @InjectRepository(Photo)
    private photosRepository: Repository<Photo>
  ) {}

  async create(filePath: string): Promise<number> {
    const result = await this.photosRepository.insert({ filePath });
    return result.identifiers[0].id;
  }

  async findOne(id: number): Promise<string> {
    const result = await this.photosRepository.findOneBy({ id });
    return result.filePath;
  }
}
