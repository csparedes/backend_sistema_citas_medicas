import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsIn, IsOptional, IsString } from "class-validator";

export class CreateUserDto {

    @ApiProperty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsString()
    last_name: string;

    @ApiProperty()
    @IsString()
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsString()
    password: string;

    @ApiProperty()
    @IsString()
    @IsIn(['admin', 'user'])
    role: string;

    @ApiProperty()
    @IsString()
    @IsIn(['active', 'inactive', 'vacation'])
    @IsOptional()
    status: string;
}
