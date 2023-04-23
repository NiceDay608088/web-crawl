import { Controller, Get, Post, Body } from '@nestjs/common';
import { CrawlService } from './crawl.service';
import { CreateCrawlDto } from './dto/create-crawl.dto';
import { convertDto2Entity } from './converter/crawl.converter';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('crawl')
@Controller('crawl')
export class CrawlController {
  constructor(private readonly crawlService: CrawlService) {}

  @Post()
  @ApiOperation({
    description: 'create crawl task api',
  })
  async create(@Body() dto: CreateCrawlDto) {
    await this.crawlService.create(convertDto2Entity(dto));
    return { code: 1, data: null, message: '' };
  }

  @Get()
  async findAll() {
    const data = await this.crawlService.findAll();
    return { code: 1, data, message: '' };
  }
}
