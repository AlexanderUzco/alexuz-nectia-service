import {
    Injectable,
    CanActivate,
    ExecutionContext,
    ForbiddenException,
} from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class AdminGuard implements CanActivate {
    constructor(private authService: AuthService) {}

    async canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest();
        const authHeader = request.headers['authorization'];

        if (!authHeader) {
            throw new ForbiddenException('No token provided');
        }

        const token = authHeader.split(' ')[1];

        try {
            const user = await this.authService.initSession(token);

            if (!user) {
                throw new ForbiddenException('Invalid token');
            }

            const { role } = user;

            if (role === 'ADMIN') {
                return true;
            } else {
                throw new ForbiddenException(
                    'You do not have the required role to access this resource',
                );
            }
        } catch (err) {
            throw new ForbiddenException('Invalid token');
        }
    }
}
