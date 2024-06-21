import { IsString, IsInt, Length } from 'class-validator';

export class CreateWorkspaceDto {
  @IsInt()
  room_id: number;

  @IsString()
  @Length(1, 45)
  row: string;

  @IsString()
  @Length(1, 45)
  column: string;

  @IsString()
  @Length(1, 45)
  workspace_status: string;
}
