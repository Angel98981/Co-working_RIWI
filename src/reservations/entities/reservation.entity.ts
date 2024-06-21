import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Workspace } from '../../workspaces/entities/workspace.entity';
import { Session } from '../../sessions/entities/session.entity';

@Entity()
export class Reservation {
  @PrimaryGeneratedColumn()
  reservation_id: number;

  @Column()
  user_id: number;

  @Column()
  workspace_id: number;

  @Column()
  session_id: number;

  @Column({ length: 45 })
  reservation_status: string;

  @ManyToOne(() => User, (user) => user.reservations)
  user: User;

  @ManyToOne(() => Workspace, (workspace) => workspace.reservations)
  workspace: Workspace;

  @ManyToOne(() => Session, (session) => session.reservations)
  session: Session;
}
