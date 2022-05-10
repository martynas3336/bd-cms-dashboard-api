import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersProjectAuthService } from './users-project-auth.service';
import { AuthGuardsEnum } from '../../../enums/authGuards.enum';
import { MetaDataKeyEnum } from '../../../enums/metaDataKey.enum';
import { Reflector } from '@nestjs/core';
import { User } from '../../users/entities/user.entity';
import { Project } from '../../project/entities/project.entity';

@Injectable()
export class UsersProjectAuthGuard implements CanActivate {
  constructor(
    private readonly projectAuthService: UsersProjectAuthService,
    private readonly reflector: Reflector,
  ) {}
  async canActivate(ctx: ExecutionContext): Promise<boolean> {
    const auth =
      this.reflector.get<keyof typeof AuthGuardsEnum>(
        MetaDataKeyEnum.AUTH,
        ctx.getHandler(),
      ) || new Array<keyof typeof AuthGuardsEnum>();
    if (
      auth.includes(AuthGuardsEnum.USER_PROJECT) &&
      (auth.includes(AuthGuardsEnum.USER_JWT) ||
        auth.includes(AuthGuardsEnum.USER_LOCAL))
    ) {
      const req = ctx.switchToHttp().getRequest();
      const user: User = req.user;
      const project: Project = req.project;
      const company = this.projectAuthService.getCompanyByProjectIdAndUserId(
        project._id,
        user._id,
      );
      if (!company) throw new UnauthorizedException();
      return true;
    }
    return true;
  }
}
