import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Reservation } from '../../reservations/entities/reservation.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  user_id: number;

  @Column({ length: 45 })
  user_name: string;

  @Column({ length: 45 })
  user_email: string;

  @Column()
  user_phone: number;

  @OneToMany(() => Reservation, (reservation) => reservation.user)
  reservations: Reservation[];
}
