import { BadRequestException, HttpException, HttpStatus } from '@nestjs/common';

export function HandleException(errorMessage: string) {
    return function (
        target: any,
        propertyKey: string,
        descriptor: PropertyDescriptor,
    ) {
        const originalMethod = descriptor.value;

        descriptor.value = async function (...args: any[]) {
            try {
                return await originalMethod.apply(this, args);
            } catch (error) {
                throw new BadRequestException({
                    status: HttpStatus.FORBIDDEN,
                    error: error || errorMessage,
                });
            }
        };

        return descriptor;
    };
}
