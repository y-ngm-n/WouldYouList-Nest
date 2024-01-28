import { IsBoolean, IsDate, IsEnum, IsNumber, IsString } from "class-validator";
import { categoryType } from "../entities/todo.entity";

export class CreateTodoDto {
  @IsString()
  user: string;

  @IsString()
  name: string;

  @IsString()
  date: string;

  @IsEnum(categoryType)
  category: categoryType;

  @IsString()
  content: string;
}
