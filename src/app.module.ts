import { APP_GUARD } from '@nestjs/core';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { config } from './config';
import { ConnectionNamesEnum } from './enums/connectionNames.enum';

// # DASHBOARD
import { BillingModule } from './modules/billing/billing.module';
import { CategoryModule } from './modules/category/category.module';
import { CompanyModule } from './modules/company/company.module';
import { CustomersModule } from './modules/customers/customers.module';
import { DetailsModule } from './modules/details/details.module';
import { DomainModule } from './modules/domain/domain.module';
import { EmailTemplatesModule } from './modules/email-templates/email-templates.module';
import { ImagesModule } from './modules/images/images.module';
import { ProductsModule } from './modules/products/products.module';
import { ProjectModule } from './modules/project/project.module';
import { SendgridModule } from './modules/sendgrid/sendgrid.module';
import { SeoModule } from './modules/seo/seo.module';
import { UsersModule } from './modules/users/users.module';
import { VariationsModule } from './modules/variations/variations.module';

// # AUTH
import { UsersAuthJwtAuthGuard } from './modules/auth/users-auth/users-auth.jwt-auth.guard';
import { UsersAuthLocalAuthGuard } from './modules/auth/users-auth/users-auth.local-auth.guard';
import { ProjectAuthGuard } from './modules/auth/project-auth/project-auth.guard';
import { UsersProjectAuthGuard } from './modules/auth/users-project-auth/users-project-auth.guard';

import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forRoot(config.dbMongoString, {
      connectionName: ConnectionNamesEnum.main,
    }),
    BillingModule,
    CategoryModule,
    CompanyModule,
    CustomersModule,
    DetailsModule,
    DomainModule,
    EmailTemplatesModule,
    ImagesModule,
    ProductsModule,
    ProjectModule,
    SendgridModule,
    SeoModule,
    UsersModule,
    VariationsModule,
  ],
  controllers: [AppController],
  providers: [
    // GUARDS
    {
      provide: APP_GUARD,
      useClass: ProjectAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: UsersAuthJwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: UsersAuthLocalAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: UsersProjectAuthGuard,
    },
    // ~~~
    AppService,
  ],
})
export class AppModule {}
