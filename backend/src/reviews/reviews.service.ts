import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Review } from './entities/review.entity';
import { Repository } from 'typeorm';
import { CreateReviewDto } from './dto/create-review.dto';
import { TodosService } from 'src/todos/todos.service';
import { PhotosService } from 'src/photos/photos.service';

type UpdateReviewType = {
  fileId?: number;
  title?: string;
  date?: string;
  content?: string;
  place?: string;
  expression?: string;
};

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review)
    private reviewsRepository: Repository<Review>,
    private readonly todosService: TodosService,
    private readonly photosService: PhotosService
  ) {}

  async create(createReviewDto: CreateReviewDto, fileId: number): Promise<number> {
    const { todo, title, date, content, place, expression } = createReviewDto;
    const review = {
      todoId: +todo,
      fileId,
      title,
      date,
      content,
      place,
      expression
    };
    const result = await this.reviewsRepository.insert(review);
    return result.identifiers[0].id;
  }

  async findAll() {
    const result = await this.reviewsRepository.find();
    const reviews = await Promise.all(
      result.map(async (review) => {
        const todo = await this.todosService.findOne(review.todoId);
        const photo = await this.photosService.findOne(review.fileId);
        delete review.todoId;
        delete review.fileId;
        const data = { ...review, photo, todo };
        return data;
      })
    );
    return reviews;
  }

  async findOne(id: number): Promise<Review> {
    const result = await this.reviewsRepository.findOneBy({ id });
    return result;
  }

  async update(id: number, data: UpdateReviewType) {
    await this.reviewsRepository.update({ id }, data);
  }

  async remove(id: number) {
    await this.reviewsRepository.delete({ id });
  }
}
