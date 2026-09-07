import { Student } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class StudentEntity implements Student {
  @ApiProperty()
  id: number;

  @ApiProperty()
  Name: string;

  @ApiProperty()
  Age: number;

  @ApiProperty()
  Subject: string;
}

