import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('appointments')
export class AppointmentEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  appointment_id: number;

  @Column('timestamp')
  @ApiProperty()
  date: Date;

  @Column('varchar')
  @ApiProperty()
  description: string;

  @Column('boolean', { default: true })
  @ApiProperty()
  status: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
