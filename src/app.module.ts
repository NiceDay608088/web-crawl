import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Dialect } from 'sequelize';
import * as dotenv from 'dotenv';
import CrawlModel from '@/crawl/models/crawl.model';
import DocumentModel from '@/crawl/models/document.model';
import { CrawlModule } from './crawl/crawl.module';

dotenv.config();

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: process.env.DB_DRIVER as Dialect,
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      pool: {
        max: 20,
        min: 1,
        idle: 1000,
      },
      define: {
        timestamps: false,
      },
      models: [CrawlModel, DocumentModel],
    }),
    CrawlModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
