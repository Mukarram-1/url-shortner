import { PartialType } from '@nestjs/mapped-types';
import { CreateUrlClickDto } from './create-urlclick.dto';

export class UpdateUrlClickDto extends PartialType(CreateUrlClickDto) { }
