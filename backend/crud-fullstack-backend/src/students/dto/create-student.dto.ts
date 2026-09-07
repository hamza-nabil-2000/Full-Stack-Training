import { ApiProperty } from '@nestjs/swagger';

export class CreateStudentDto {
  @ApiProperty()
  Name: string;

  @ApiProperty()
  Age: number;

  @ApiProperty()
  Subject: string;
}
