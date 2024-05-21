import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsDateString, IsOptional, IsString } from "class-validator";

export class CreateAppointmentDto {

    @IsString()
    @IsDateString()
    @ApiProperty()
    date: Date;

    @IsString()
    @ApiProperty()
    description: string;

    @IsBoolean()
    @IsOptional()
    @ApiProperty()
    status: boolean;

}
