import { Module } from '@nestjs/common';
import { SessionsService } from './sessions.service';
import { SessionsController } from './sessions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Session } from './entities/session.entity';
import { Room } from 'src/rooms/entities/room.entity';
import { Reservation } from 'src/reservations/entities/reservation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Reservation, Session, Room])],
  controllers: [SessionsController],
  providers: [SessionsService],
})
export class SessionsModule {}
