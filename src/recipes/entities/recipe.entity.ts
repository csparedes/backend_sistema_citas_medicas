import { ApiProperty } from "@nestjs/swagger";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity('recipes')
export class RecipeEntity {
    @PrimaryGeneratedColumn()
    @ApiProperty()
    recipe_id: number

    @ApiProperty()
    @Column('timestamp')
    date: Date

    @ApiProperty()
    @Column('varchar')
    medication: string
    
    
    @ApiProperty()
    @Column('varchar')
    instructions: string

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date
}
