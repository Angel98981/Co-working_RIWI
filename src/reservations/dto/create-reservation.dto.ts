import { IsString, IsInt } from 'class-validator';

export class CreateReservationDto {
  @IsInt()
  user_id: number;

  @IsInt()
  workspace_id: number;

  @IsInt()
  session_id: number;

  @IsString()
  reservation_status: string;
}
