import './dotenv';
import * as helmet from 'helmet';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { config } from './config';

import { AppModule } from './app.module';
import { HttpExceptionFilter } from './exceptions/exception.filter';
import { Request, Response, NextFunction } from 'express';

// # DASHBOARD
import { BillingModule } from './modules/billing/billing.module';
import { CategoryModule } from './modules/category/category.module';
import { CompanyModule } from './modules/company/company.module';
import { CustomersModule } from './modules/customers/customers.module';
import { DetailsModule } from './modules/details/details.module';
import { DomainModule } from './modules/domain/domain.module';
import { ImagesModule } from './modules/images/images.module';
import { ProductsModule } from './modules/products/products.module';
import { ProjectModule } from './modules/project/project.module';
import { SendgridModule } from './modules/sendgrid/sendgrid.module';
import { SeoModule } from './modules/seo/seo.module';
import { UsersModule } from './modules/users/users.module';
import { VariationsModule } from './modules/variations/variations.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter());

  app.use(function (req: Request, res: Response, next: NextFunction) {
    res.header('Cache-Control', 'no-cache');
    res.header('Pragma', 'no-cache');
    res.header('Access-Control-Allow-Origin', '*');
    next();
  });

  // ### SWAGGER ###
  const configForAdmin = new DocumentBuilder()
    .setTitle('Hyper Deep Pool - Admin')
    .setDescription(
      `New data structure ! DTOs + Entities, Changes in: [Products: GET, UPDATE, DELETE], version - ${new Date()}`,
    )
    .setVersion('1.000.1')
    .addTag(`${new Date()}`)
    .build();

  const documentAdmin = SwaggerModule.createDocument(app, configForAdmin, {
    include: [
      BillingModule,
      CategoryModule,
      CompanyModule,
      CustomersModule,
      DetailsModule,
      DomainModule,
      ImagesModule,
      ProductsModule,
      ProjectModule,
      SendgridModule,
      SeoModule,
      UsersModule,
      VariationsModule,
      SendgridModule,
    ],
  });
  SwaggerModule.setup('api/v1/swagger', app, documentAdmin);
  // ~~~~~~

  app.use(helmet());
  app.enableCors({
    exposedHeaders: 'new-token',
  });
  await app.listen(config.port).then(() => {
    console.log(`Application started. Listening port ${config.port}`);
  });
}
bootstrap().then();
