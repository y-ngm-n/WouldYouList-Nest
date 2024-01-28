import { PartialType } from "@nestjs/mapped-types";
import { CreateReviewDto } from "./create-review.dto";
import { IsString } from "class-validator";

export class UpdateReviewDto extends PartialType(CreateReviewDto) {
  @IsString()
  isDeleted: string;
}