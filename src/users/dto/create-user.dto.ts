import { IsString, IsInt, Length } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @Length(1, 45)
  user_name: string;

  @IsString()
  @Length(1, 45)
  user_email: string;

  @IsInt()
  user_phone: number;
}
