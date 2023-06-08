import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdateTodoDto {
  @IsString()
  id: string;

  @IsString()
  @IsOptional()
  content: string;

  @IsBoolean()
  @IsOptional()
  completed: boolean;

  @IsBoolean()
  @IsOptional()
  delete: boolean;
}
