import { Body, Controller, Delete, Get, Param, Patch, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { FileInterceptor } from "@nestjs/platform-express";
import { CreateReviewDto } from './dto/create-review.dto';
import { MulterConfig } from 'multer.config';
import { PhotosService } from 'src/photos/photos.service';
import { TodosService } from 'src/todos/todos.service';
import { UpdateReviewDto } from './dto/update-review.dto';

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
  ): Promise<number> {
    const { todo } = createReviewDto;
    const fileId = (file) ? await this.photosService.create(file.location) : 1;
    const reviewId = await this.reviewsService.create(createReviewDto, fileId);
    this.todosService.setReview(+todo, reviewId);
    return reviewId;
  }

  @Get()
  findAll() {
    return this.reviewsService.findAll();
  }

  @Patch(":id")
  @UseInterceptors(FileInterceptor("file", MulterConfig))
  async update(
    @Param("id") id: number,
    @Body() updateReviewDto: UpdateReviewDto,
    @UploadedFile() file: Express.MulterS3.File
  ) {
    const isDeleted = +updateReviewDto.isDeleted;
    // if (isDeleted) {
    //   // 기존 file 삭제 logic
    // }
    delete updateReviewDto.isDeleted;
    if (!isDeleted && !file) { return this.reviewsService.update(id, updateReviewDto); }
    else {
      const fileId = (file) ? await this.photosService.create(file.location) : 1;
      return this.reviewsService.update(id, { fileId, ...updateReviewDto });
    }
  }

  @Delete(":id")
  async remove(@Param("id") id: number) {
    const review = await this.reviewsService.findOne(id);
    if (review.fileId != 1) await this.photosService.remove(review.fileId);
    return this.reviewsService.remove(id);
  }
}
