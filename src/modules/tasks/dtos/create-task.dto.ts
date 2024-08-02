import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateTaskDto {
    @IsString()
    @Type(() => String)
    readonly title: string;

    @IsString()
    @Type(() => String)
    readonly description: string;

    @IsBoolean()
    @IsOptional()
    @Type(() => Boolean)
    readonly completed?: boolean;

    @IsString()
    @Type(() => String)
    readonly userID: string;
}
