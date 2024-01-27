import { Body, Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { FileInterceptor } from "@nestjs/platform-express";
import { CreateReviewDto } from './dto/create-review.dto';
import { MulterConfig } from 'multer.config';
import { PhotosService } from 'src/photos/photos.service';
import { TodosService } from 'src/todos/todos.service';

@Controller('reviews')
export class ReviewsController {
  constructor(
    private readonly todosService: TodosService,
    private readonly reviewsService: ReviewsService,
    private readonly photosService: PhotosService
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor("file", MulterConfig))
  async create(
    @Body() createReviewDto: CreateReviewDto,
    @UploadedFile() file: Express.MulterS3.File
  ) {
    const { todo } = createReviewDto;
    const fileId = await this.photosService.create(file.location);
    const reviewId = await this.reviewsService.create(createReviewDto, fileId);
    this.todosService.setReview(+todo, reviewId);
    console.log(+todo, fileId, reviewId);
  }
}
