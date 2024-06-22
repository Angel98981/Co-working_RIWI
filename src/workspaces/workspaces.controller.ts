import { Controller, Get, Param, Delete } from '@nestjs/common';
import { WorkspacesService } from './workspaces.service';

import { ApiTags } from '@nestjs/swagger';
import { Workspace } from './entities/workspace.entity';

@ApiTags('Workspaces')
@Controller('workspaces')
export class WorkspacesController {
  constructor(private readonly workspacesService: WorkspacesService) {}

  @Get()
  findAll() {
    return this.workspacesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.workspacesService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.workspacesService.remove(+id);
  }
  @Get('available/:roomId/:sessionId')
  getAvailableWorkspaces(
    @Param('roomId') roomId: number,
    @Param('sessionId') sessionId: number,
  ): Promise<Workspace[]> {
    return this.workspacesService.getAvailableWorkspaces(roomId, sessionId);
  }

  @Get('occupied/:roomId/:sessionId')
  getOccupiedWorkspaces(
    @Param('roomId') roomId: number,
    @Param('sessionId') sessionId: number,
  ): Promise<Workspace[]> {
    return this.workspacesService.getOccupiedWorkspaces(roomId, sessionId);
  }
  // Endpoint para obtener los espacios de trabajo asignados a un usuario
  @Get('workspaces/assigned-to-user/:userId')
  getWorkspacesByUser(@Param('userId') userId: number): Promise<Workspace[]> {
    return this.workspacesService.getWorkspacesByUser(userId);
  }

  // Endpoint para obtener los espacios de trabajo asignados a una sesión
  @Get('workspaces/assigned-to-session/:sessionId')
  getWorkspacesBySession(
    @Param('sessionId') sessionId: number,
  ): Promise<Workspace[]> {
    return this.workspacesService.getWorkspacesBySession(sessionId);
  }
}
