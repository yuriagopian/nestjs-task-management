import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class AuthCredentialsDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(20)
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
