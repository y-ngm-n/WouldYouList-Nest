import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Review } from './entities/review.entity';
import { Repository } from 'typeorm';
import { CreateReviewDto } from './dto/create-review.dto';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review)
    private reviewsRepository: Repository<Review>
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
    return result;
  }
}
