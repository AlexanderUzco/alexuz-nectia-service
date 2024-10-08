import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtHelper } from 'src/helpers/jwt.helper';
import { UsersService } from '../users/users.service';
import { AccessTokensService } from '../accesstoken/accessTokens.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly accessTokensService: AccessTokensService,
    ) {}

    async initSession(token: string) {
        const decoded: any = await JwtHelper.verifyJWT(token);

        const { uid } = decoded;

        const user = await this.usersService.findOneById(uid);

        const existAccessToken = await this.accessTokensService.findByUserId(
            user._id as string,
        );

        if (!existAccessToken) {
            throw new UnauthorizedException('Token not found');
        }

        if (decoded.exp <= Date.now() / 1000) {
            await this.accessTokensService.deleteByUserId(uid);
            throw new UnauthorizedException('Token has expired');
        }

        if (user) {
            return {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                token,
            };
        }

        return null;
    }
}
