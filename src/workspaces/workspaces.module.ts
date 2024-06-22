import { Module } from '@nestjs/common';
import { WorkspacesService } from './workspaces.service';
import { WorkspacesController } from './workspaces.controller';
import { Workspace } from './entities/workspace.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Session } from 'src/sessions/entities/session.entity';
import { Reservation } from 'src/reservations/entities/reservation.entity';
import { Room } from 'src/rooms/entities/room.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Workspace, Session, Reservation, Room])],
  controllers: [WorkspacesController],
  providers: [WorkspacesService],
})
export class WorkspacesModule {}
