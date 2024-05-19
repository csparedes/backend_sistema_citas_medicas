import { ApiProperty } from "@nestjs/swagger";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('user')
export class UserEntity {
     @PrimaryGeneratedColumn()
     @ApiProperty()
     user_id: number;

     @Column('varchar')
     @ApiProperty()
     name: string;

     @ApiProperty()
     @Column('varchar')
     last_name: string;

     @ApiProperty()
     @Column('varchar')
     email: string;

     @Column('varchar')
     @ApiProperty()
     password: string;

     @Column({ type: 'enum', enum: ['admin', 'user'], default: 'user' })
     @ApiProperty()
     role: string;

     @Column({ type: 'enum', enum: ['active', 'inactive', 'vacation'], default: 'active'})
     @ApiProperty()
     status: string;

     @CreateDateColumn()
     created_at: Date;

     @UpdateDateColumn()
     updated_at: Date;
}
