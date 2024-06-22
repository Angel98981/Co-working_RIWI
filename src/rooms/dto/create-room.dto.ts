import { IsString, IsInt, Length } from 'class-validator';

export class CreateRoomDto {
  @IsString()
  @Length(1, 45)
  room_name: string;

  @IsString()
  @Length(1, 150)
  room_description: string;

  @IsInt()
  total_rows: number;

  @IsInt()
  total_columns: number;
}
