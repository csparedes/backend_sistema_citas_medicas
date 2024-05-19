import { IsString } from "class-validator";

export class CreateMedicDto {

    @IsString()
    speciality: string;

    @IsString()
    authorization_number: string;
}
