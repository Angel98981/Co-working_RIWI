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
export class Session {
  @PrimaryGeneratedColumn()
  session_id: number;

  @Column()
  room_id: number;

  @Column()
  start_time: Date;

  @Column('interval')
  duration: any;

  @Column({ length: 150 })
  session_description: string;

  @ManyToOne(() => Room, (room) => room.sessions)
  room: Room;

  @OneToMany(() => Reservation, (reservation) => reservation.session)
  reservations: Reservation[];
}
