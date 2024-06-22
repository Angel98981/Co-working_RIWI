import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Workspace } from 'src/workspaces/entities/workspace.entity';
import { Session } from './entities/session.entity';
import { Repository } from 'typeorm';
import { Room } from 'src/rooms/entities/room.entity';
import { Reservation } from 'src/reservations/entities/reservation.entity';

@Injectable()
export class SessionsService {
  constructor(
    @InjectRepository(Session)
    private sessionRepository: Repository<Session>,
    @InjectRepository(Room)
    private roomRepository: Repository<Room>,
    @InjectRepository(Reservation)
    private reservationRepository: Repository<Reservation>,
  ) {}
  findAll() {
    return `This action returns all sessions`;
  }

  findOne(id: number) {
    return `This action returns a #${id} session`;
  }

  remove(id: number) {
    return `This action removes a #${id} session`;
  }

  // Método para obtener las sesiones ordenadas por las más ocupadas
  async getSessionsByMostOccupied(): Promise<Session[]> {
    return this.sessionRepository
      .createQueryBuilder('session')
      .leftJoinAndSelect('session.reservations', 'reservation')
      .orderBy('COUNT(reservation.reservation_id)', 'DESC')
      .groupBy('session.session_id')
      .getMany();
  }

  // Método para obtener las sesiones ordenadas por las más disponibles
  async getSessionsByMostAvailable(): Promise<Session[]> {
    const sessions = await this.sessionRepository.find({
      relations: ['reservations', 'room'],
    });
    const rooms = await this.roomRepository.find({ relations: ['workspaces'] });

    sessions.forEach((session) => {
      const room = rooms.find((room) => room.room_id === session.room_id);
      const totalWorkspaces = room.workspaces.length;
      session['availableWorkspaces'] =
        totalWorkspaces - session.reservations.length;
    });

    return sessions.sort(
      (a, b) => b['availableWorkspaces'] - a['availableWorkspaces'],
    );
  }

  // Método para obtener los espacios de trabajo asignados a un usuario
  async getWorkspacesByUser(userId: number): Promise<Workspace[]> {
    const reservations = await this.reservationRepository.find({
      where: { user_id: userId },
      relations: ['workspace'],
    });
    return reservations.map((reservation) => reservation.workspace);
  }

  // Método para obtener los espacios de trabajo asignados a una sesión
  async getWorkspacesBySession(sessionId: number): Promise<Workspace[]> {
    const reservations = await this.reservationRepository.find({
      where: { session_id: sessionId },
      relations: ['workspace'],
    });
    return reservations.map((reservation) => reservation.workspace);
  }
}
