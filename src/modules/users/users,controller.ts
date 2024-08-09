import { Controller, Get, Post, Body, UseGuards, Param } from '@nestjs/common';
import { AuthUser } from '../auth/auth.decorator';
import { CreateUserDto } from './dtos/create-user.dto';
import { SigninDto } from './dtos/signin.dto';
import { UsersService } from './users.service';
import { AuthUserDto } from '../auth/dtos/auth-user.dto';
import { FindByEmailDto } from './dtos/find-by-email.dto';
import { DesactivateUserDto } from './dtos/desactivate-user.dto';
import { AdminGuard } from '../auth/auth.guard';
import { UpdateByAdminDto } from './dtos/update-by-admin.dto';
import { Types } from 'mongoose';
import { HandleException } from 'src/decorators/handle-exceptio-decorator.decorator';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post('/signup')
    @HandleException('ERROR CREATE USER')
    async signup(@Body() createUserDto: CreateUserDto) {
        return this.usersService.createUser(createUserDto);
    }

    @Post('/signin')
    @HandleException('ERROR SIGNIN USER')
    async signin(@Body() signinDto: SigninDto) {
        return this.usersService.signin(signinDto);
    }

    @Get('/signout')
    @HandleException('ERROR SIGNOUT USER')
    async signout(@AuthUser() user: AuthUserDto) {
        return this.usersService.signout(user._id);
    }

    @Get('/verify-token')
    @HandleException('ERROR VERIFY TOKEN')
    async verifyToken(@AuthUser() user: AuthUserDto) {
        return this.usersService.verifyToken(user);
    }

    @Get()
    @UseGuards(AdminGuard)
    @HandleException('ERROR FIND ALL USERS')
    async findAll() {
        return this.usersService.findAll();
    }

    @Post('/update-by-admin')
    @UseGuards(AdminGuard)
    @HandleException('ERROR UPDATE BY ADMIN')
    async updateByAdmin(@Body() updateByAdminDto: UpdateByAdminDto) {
        return this.usersService.updateByAdmin(updateByAdminDto);
    }

    @Post('/create-from-admin')
    @UseGuards(AdminGuard)
    @HandleException('ERROR CREATE USER FROM ADMIN')
    async createFromAdmin(@Body() createUserDto: CreateUserDto) {
        return this.usersService.createUser(createUserDto);
    }

    @Post('find-by-email')
    @HandleException('ERROR FIND USER BY EMAIL')
    async findByEmail(@Body() findByEmailDto: FindByEmailDto) {
        return this.usersService.findOneByEmail(findByEmailDto.email);
    }

    @Post('/desactivate-user')
    @HandleException('ERROR DESACTIVATE USER')
    async desactivateUser(@Body() desactivateUserDto: DesactivateUserDto) {
        return this.usersService.desactivateUser(desactivateUserDto);
    }

    @Post('/delete-user/:id')
    @UseGuards(AdminGuard)
    @HandleException('ERROR DELETE USER')
    async deleteUser(@Param('id') id: Types.ObjectId) {
        return this.usersService.setDeletedUser(id);
    }
}
