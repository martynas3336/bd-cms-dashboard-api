import { Module } from '@nestjs/common';
import { UsersAuthModule } from './users-auth/users-auth.module';
import { ProjectAuthModule } from './project-auth/project-auth.module';
import { UsersProjectAuthModule } from './users-project-auth/users-project-auth.module';

@Module({
  imports: [UsersAuthModule, ProjectAuthModule, UsersProjectAuthModule],
  providers: [UsersAuthModule, ProjectAuthModule, UsersProjectAuthModule],
  exports: [UsersAuthModule, ProjectAuthModule, UsersProjectAuthModule],
})
export class AuthModule {}
