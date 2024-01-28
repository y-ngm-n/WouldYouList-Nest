import { Module } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ReviewsController } from './reviews.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Review } from './entities/review.entity';
import { TodosModule } from 'src/todos/todos.module';
import { PhotosModule } from 'src/photos/photos.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Review]),
    TodosModule,
    PhotosModule
  ],
  controllers: [ReviewsController],
  providers: [ReviewsService],
})
export class ReviewsModule {}
