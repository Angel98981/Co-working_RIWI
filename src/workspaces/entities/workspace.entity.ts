import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Room } from '../../rooms/entities/room.entity';
import { Reservation } from '../../reservations/entities/reservation.entity';

@Entity()
export class Workspace {
  @PrimaryGeneratedColumn()
  workspace_id: number;

  @Column()
  room_id: number;

  @Column({ length: 45 })
  row: string;

  @Column({ length: 45 })
  column: string;

  @Column({ length: 45 })
  status: string;

  @ManyToOne(() => Room, (room) => room.workspaces)
  room: Room;

  @OneToMany(() => Reservation, (reservation) => reservation.workspace)
  reservations: Reservation[];
}
