import { IsString, ValidateIf } from 'class-validator';

export class ValidateUserDto {
  @IsString()
  @ValidateIf((obj, value) => !obj.username || value)
  email: string;

  @IsString()
  @ValidateIf((obj, value) => !obj.email || value)
  username: string;

  @IsString()
  password: string;
}
