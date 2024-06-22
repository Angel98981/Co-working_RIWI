import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { In, Not, Repository } from 'typeorm';
import { Workspace } from './entities/workspace.entity';
import { Session } from 'src/sessions/entities/session.entity';
import { Reservation } from 'src/reservations/entities/reservation.entity';

@Injectable()
export class WorkspacesService {
  constructor(
    @InjectRepository(Workspace)
    private workspacesRepository: Repository<Workspace>,
    @InjectRepository(Session)
    private sessionRepository: Repository<Session>,
    @InjectRepository(Reservation)
    private reservationRepository: Repository<Reservation>,
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

  async getAvailableWorkspaces(
    roomId: number,
    sessionId: number,
  ): Promise<Workspace[]> {
    const session = await this.sessionRepository.findOne({
      where: { session_id: sessionId },
      relations: ['reservations'],
    });
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
  }

  async getOccupiedWorkspaces(
    roomId: number,
    sessionId: number,
  ): Promise<Workspace[]> {
    const session = await this.sessionRepository.findOne({
      where: { session_id: sessionId },
      relations: ['reservations'],
    });
    const reservedWorkspaceIds = session.reservations.map(
      (reservation) => reservation.workspace_id,
    );

    return this.workspacesRepository.find({
      where: {
        room_id: roomId,
        workspace_id: Not(In(reservedWorkspaceIds)),
        workspace_status: 'occupied',
      },
    });
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
