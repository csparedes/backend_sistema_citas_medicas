import { PartialType } from '@nestjs/swagger';
import { CreateMedicDto } from './create-medic.dto';

export class UpdateMedicDto extends PartialType(CreateMedicDto) {}
