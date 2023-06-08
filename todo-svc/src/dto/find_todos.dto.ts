import { IsString, IsBoolean } from 'class-validator';

export class FindTodosDto {
  @IsString()
  userId: string;

  @IsBoolean()
  completed = false;

  @IsBoolean()
  deleted = false;
}
