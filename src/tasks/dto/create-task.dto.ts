export class CreateTaskReqDto {
  title: string;
  description: string;
}

export class CreateTaskResDto {
  title: string;
  description: string;
  id: string;
  status: string;
}
