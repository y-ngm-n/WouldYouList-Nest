import { IsNumber, IsString } from "class-validator";

export class CreateReviewDto {
  // @IsString()
  // todo: string;
  @IsString()
  todo: string;

  @IsString()
  date: string;

  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsString()
  place: string;

  @IsString()
  expression: string;
}