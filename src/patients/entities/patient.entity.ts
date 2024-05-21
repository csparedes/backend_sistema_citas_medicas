import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('patients')
export class PatientEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  patient_id: number;

  @Column('varchar')
  @ApiProperty()
  name: string;

  @Column('varchar')
  @ApiProperty()
  lastname: string;

  @Column('timestamp')
  @ApiProperty()
  birthdate: Date;

  @Column('varchar')
  @ApiProperty()
  address: string;

  @Column('varchar')
  @ApiProperty()
  phone: string;

  @Column('varchar')
  @ApiProperty()
  email: string;

  @Column('boolean', { default: true })
  @ApiProperty()
  status: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
