import { IsString, IsEmail, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';
import { Optional } from '@nestjs/common';

export class CreateUserDto {
    @IsString()
    @Type(() => String)
    @Optional()
    readonly _id?: string = '';

    @IsString()
    @Type(() => String)
    readonly name: string;

    @IsString()
    @Type(() => String)
    readonly lastname: string;

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    @Type(() => String)
    readonly email: string;

    @IsString()
    @Type(() => String)
    readonly password?: string;

    @IsString()
    @Type(() => String)
    readonly origin: string;

    @IsString()
    @Type(() => String)
    readonly role: string;
}
