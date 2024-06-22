import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ description: 'the name of user' })
  @IsString()
  @Length(1, 45)
  user_name: string;

  @ApiProperty({ description: 'the email of user' })
  @IsString()
  @Length(1, 45)
  user_email: string;

  @ApiProperty({ description: 'the phone of user' })
  @IsInt()
  @Length(1, 45)
  user_phone: number;
}
