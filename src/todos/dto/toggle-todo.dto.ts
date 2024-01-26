import { IsBoolean } from "class-validator";

export class ToggleTodoDto {
  @IsBoolean()
  state: boolean;
}
