import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTaskReqDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;
}

export class CreateTaskResDto {
  title: string;
  description: string;
  id: string;
  status: string;
}
