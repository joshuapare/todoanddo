import { IsString } from 'class-validator';

export class FindTodoDto {
  @IsString()
  id: string;
}
