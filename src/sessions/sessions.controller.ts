import { Controller, Get, Param, Delete } from '@nestjs/common';
import { SessionsService } from './sessions.service';

import { ApiTags } from '@nestjs/swagger';
import { Session } from './entities/session.entity';

@ApiTags('Sessions')
@Controller('sessions')
export class SessionsController {
  constructor(private readonly sessionsService: SessionsService) {}

  @Get()
  findAll() {
    return this.sessionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sessionsService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sessionsService.remove(+id);
  }

  // Endpoint para obtener las sesiones ordenadas por las más ocupadas
  @Get('sessions/most-occupied')
  getSessionsByMostOccupied(): Promise<Session[]> {
    return this.sessionsService.getSessionsByMostOccupied();
  }

  // Endpoint para obtener las sesiones ordenadas por las más disponibles
  @Get('sessions/most-available')
  getSessionsByMostAvailable(): Promise<Session[]> {
    return this.sessionsService.getSessionsByMostAvailable();
  }
}
