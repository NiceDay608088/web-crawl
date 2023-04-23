import CrawlEntity from '@/crawl/entities/crawl.enttity';
import { CreateCrawlDto } from '@/crawl/dto/create-crawl.dto';

export const convertDto2Entity = (dto: CreateCrawlDto): CrawlEntity => {
  const entity = new CrawlEntity();
  entity.url = dto.url;
  return entity;
};
