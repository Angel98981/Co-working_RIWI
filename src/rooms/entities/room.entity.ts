import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Workspace } from '../../workspaces/entities/workspace.entity';
import { Session } from '../../sessions/entities/session.entity';

@Entity()
export class Room {
  @PrimaryGeneratedColumn()
  room_id: number;

  @Column({ length: 45 })
  name: string;

  @Column({ length: 150 })
  description: string;

  @Column()
  rows: number;

  @Column()
  columns: number;

  @OneToMany(() => Workspace, (workspace) => workspace.room)
  workspaces: Workspace[];

  @OneToMany(() => Session, (session) => session.room)
  sessions: Session[];
}
