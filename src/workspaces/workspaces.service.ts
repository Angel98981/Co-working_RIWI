import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { In, Not, Repository } from 'typeorm';
import { Workspace } from './entities/workspace.entity';
import { Session } from 'src/sessions/entities/session.entity';
import { Reservation } from 'src/reservations/entities/reservation.entity';
import { Room } from 'src/rooms/entities/room.entity';

@Injectable()
export class WorkspacesService {
  constructor(
    @InjectRepository(Workspace)
    private workspacesRepository: Repository<Workspace>,
    @InjectRepository(Session)
    private sessionRepository: Repository<Session>,
    @InjectRepository(Reservation)
    private reservationRepository: Repository<Reservation>,
    @InjectRepository(Room)
    private roomRepository: Repository<Room>,
  ) {}
  findAll() {
    return `This action returns all workspaces`;
  }

  findOne(id: number) {
    return `This action returns a #${id} workspace`;
  }

  remove(id: number) {
    return `This action removes a #${id} workspace`;
  }

  // Método para obtener las sesiones ordenadas por las más disponibles
  async getSessionsByMostAvailable(): Promise<Session[]> {
    try {
      const sessions = await this.sessionRepository.find({
        relations: ['reservations', 'room'],
      });
      const rooms = await this.roomRepository.find({
        relations: ['workspaces'],
      });

      sessions.forEach((session) => {
        const room = rooms.find((room) => room.room_id === session.room_id);
        if (!room) {
          throw new NotFoundException(
            `Room with id ${session.room_id} not found`,
          );
        }
        const totalWorkspaces = room.workspaces.length;
        session['availableWorkspaces'] =
          totalWorkspaces - session.reservations.length;
      });

      return sessions.sort(
        (a, b) => b['availableWorkspaces'] - a['availableWorkspaces'],
      );
    } catch (error) {
      throw new InternalServerErrorException(
        'Error fetching most available sessions',
      );
    }
  }

  async getAvailableWorkspaces(
    roomId: number,
    sessionId: number,
  ): Promise<Workspace[]> {
    try {
      const session = await this.sessionRepository.findOne({
        where: { session_id: sessionId },
        relations: ['reservations'],
      });
      if (!session) {
        throw new NotFoundException(`Session with id ${sessionId} not found`);
      }
      const reservedWorkspaceIds = session.reservations.map(
        (reservation) => reservation.workspace_id,
      );

      return this.workspacesRepository.find({
        where: {
          room_id: roomId,
          workspace_id: Not(In(reservedWorkspaceIds)),
          workspace_status: 'available',
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(
        'Error fetching available workspaces',
      );
    }
  }

  async getOccupiedWorkspaces(
    roomId: number,
    sessionId: number,
  ): Promise<Workspace[]> {
    try {
      const session = await this.sessionRepository.findOne({
        where: { session_id: sessionId },
        relations: ['reservations'],
      });
      if (!session) {
        throw new NotFoundException(`Session with id ${sessionId} not found`);
      }
      const reservedWorkspaceIds = session.reservations.map(
        (reservation) => reservation.workspace_id,
      );

      return this.workspacesRepository.find({
        where: {
          room_id: roomId,
          workspace_id: In(reservedWorkspaceIds),
          workspace_status: 'occupied',
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(
        'Error fetching occupied workspaces',
      );
    }
  }
  // Método para obtener los espacios de trabajo asignados a un usuario
  async getWorkspacesByUser(userId: number): Promise<Workspace[]> {
    try {
      const reservations = await this.reservationRepository.find({
        where: { user_id: userId },
        relations: ['workspace'],
      });
      if (!reservations.length) {
        throw new NotFoundException(
          `No workspaces found for user with id ${userId}`,
        );
      }
      return reservations.map((reservation) => reservation.workspace);
    } catch (error) {
      throw new InternalServerErrorException(
        'Error fetching workspaces for user',
      );
    }
  }

  // Método para obtener los espacios de trabajo asignados a una sesión
  async getWorkspacesBySession(sessionId: number): Promise<Workspace[]> {
    try {
      const reservations = await this.reservationRepository.find({
        where: { session_id: sessionId },
        relations: ['workspace'],
      });
      if (!reservations.length) {
        throw new NotFoundException(
          `No workspaces found for session with id ${sessionId}`,
        );
      }
      return reservations.map((reservation) => reservation.workspace);
    } catch (error) {
      throw new InternalServerErrorException(
        'Error fetching workspaces for session',
      );
    }
  }
}
