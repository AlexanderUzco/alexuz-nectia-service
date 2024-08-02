import { IsString, IsEmail, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateByAdminDto {
    @IsString()
    @IsNotEmpty()
    readonly id: string;

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
    readonly role: string;
}
