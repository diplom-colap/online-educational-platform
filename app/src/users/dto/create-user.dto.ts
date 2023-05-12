import { ApiProperty } from '@nestjs/swagger';
import { Role, SocialProvider } from '@prisma/client';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  idOnSP: string;

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  phone: string;

  @ApiProperty({ enum: Role })
  role: Role;

  @ApiProperty({ enum: SocialProvider })
  socialProvider: SocialProvider;
}
