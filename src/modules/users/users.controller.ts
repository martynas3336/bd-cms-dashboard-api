import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  Put,
  Get,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiBody, ApiHeader, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PasswordDto } from './dto/set-password.dto';
import { EmailDto } from './dto/email.dto';
import { LoginUserDto } from './dto/login.dto';
import { ProfileUpdateDto } from './dto/profile-update.dto';
import { User } from './entities/user.entity';
import { InviteDto } from './dto/invite.dto';
import { UsersAuthUserDecorator } from '../auth/users-auth/users-auth.user.decorator';
import { UsersAuthService } from '../auth/users-auth/users-auth.service';
import { Auth } from '../auth/auth.decorator';
import { AuthGuardsEnum } from '../../enums/authGuards.enum';
import { CreateRo } from './ro/create.ro';
import { LoginRo } from './ro/login.ro';
import { SetPasswordRo } from './ro/set-password.ro';
import { PasswordResetRo } from './ro/password-reset.ro';
import { UpdateProfileRo } from './ro/update-profile.ro';
import { GetProfileRo } from './ro/get-profile.ro';
import { GetAllCompanyUsersRo } from './ro/get-all-company-users.ro';
import { CompanyInviteUserRo } from './ro/company-invite-user';

@ApiTags('API dashboard users')
@Controller('dashboard/v1/users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly usersAuthService: UsersAuthService,
  ) {}

  @Post('register')
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({ status: 200, type: CreateRo })
  @UsePipes(new ValidationPipe({ whitelist: true }))
  create(@Body() createUserDto: CreateUserDto): Promise<CreateRo> {
    return this.usersService.create(createUserDto);
  }

  @Post('login')
  @ApiBody({ type: LoginUserDto })
  @ApiResponse({ status: 200, type: LoginRo })
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @Auth(AuthGuardsEnum.USER_LOCAL)
  async login(@UsersAuthUserDecorator() user: User): Promise<LoginRo> {
    const { accessToken } = await this.usersAuthService.login(user);
    await this.usersService.updateLastLoginDate(user);
    return { accessToken };
  }

  @Post('password')
  @ApiBody({ type: PasswordDto })
  @ApiResponse({ status: 200, type: SetPasswordRo })
  setPassword(@Body() password: PasswordDto): Promise<SetPasswordRo> {
    return this.usersService.setPassword(password);
  }

  @Post('password/reset')
  @ApiBody({ type: EmailDto })
  @ApiResponse({ status: 200, type: PasswordResetRo })
  request(@Body() body: EmailDto): Promise<PasswordResetRo> {
    return this.usersService.requestUserChangePassword(body.email);
  }

  @Put('profile')
  @ApiHeader({ required: true, name: 'jwtToken' })
  @ApiResponse({ status: 200, type: UpdateProfileRo })
  @Auth(AuthGuardsEnum.USER_JWT)
  async updateProfile(
    @Body() body: ProfileUpdateDto,
    @UsersAuthUserDecorator() user: User,
  ): Promise<UpdateProfileRo> {
    return await this.usersService.updateProfile(user._id, body);
  }

  @Get('profile')
  @ApiHeader({ required: true, name: 'jwtToken' })
  @ApiResponse({ status: 200, type: GetProfileRo })
  @Auth(AuthGuardsEnum.USER_JWT)
  async getProfile(
    @UsersAuthUserDecorator() user: User,
  ): Promise<GetProfileRo> {
    return await this.usersService.getProfile(user._id);
  }

  @Get('within/company')
  @ApiHeader({ required: true, name: 'jwtToken' })
  @ApiResponse({ status: 200, type: GetAllCompanyUsersRo })
  @Auth(AuthGuardsEnum.USER_JWT)
  async getAllCompanyUsers(
    @UsersAuthUserDecorator() user: User,
  ): Promise<GetAllCompanyUsersRo> {
    return await this.usersService.all(user._id);
  }

  @Post('invite')
  @ApiBody({ type: InviteDto })
  @ApiResponse({ status: 200, type: CompanyInviteUserRo })
  @ApiHeader({ required: true, name: 'jwtToken' })
  @Auth(AuthGuardsEnum.USER_JWT)
  async companyInviteUser(
    @Body() body: InviteDto,
    @UsersAuthUserDecorator() user: User,
  ): Promise<CompanyInviteUserRo> {
    return await this.usersService.invite(user._id, body.email);
  }
}
