import { ApiProperty } from "@nestjs/swagger";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('medics')
export class MedicEntity {
    @PrimaryGeneratedColumn()
    @ApiProperty()
    medic_id: number;

    @Column('varchar')
    @ApiProperty()
    speciality: string;

    @Column('varchar')
    @ApiProperty()
    authorization_number: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
