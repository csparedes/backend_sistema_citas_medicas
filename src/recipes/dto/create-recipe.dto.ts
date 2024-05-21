import { ApiProperty } from "@nestjs/swagger"
import { IsDateString, IsString } from "class-validator"

export class CreateRecipeDto {
    
    @IsString()
    @IsDateString()
    @ApiProperty()
    date: string

    @IsString()
    @ApiProperty()
    medication: string

    @IsString()
    @ApiProperty()
    instructions: string
}
