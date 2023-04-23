import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import CrawlModel from './models/crawl.model';
import { CrawlService } from './crawl.service';
import { CrawlController } from './crawl.controller';
import DocumentModel from './models/document.model';

@Module({
  imports: [SequelizeModule.forFeature([CrawlModel, DocumentModel])],
  controllers: [CrawlController],
  providers: [CrawlService],
})
export class CrawlModule {}
