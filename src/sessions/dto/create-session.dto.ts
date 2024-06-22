import { IsString, IsInt, IsDate } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateSessionDto {
  @IsInt()
  room_id: number;

  @IsDate()
  @Type(() => Date)
  start_time: Date;

  @IsString()
  duration: string;

  @IsString()
  session_description: string;
}
