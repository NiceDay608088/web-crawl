import { ApiProperty } from '@nestjs/swagger';

export class CreateCrawlDto {
  @ApiProperty({ description: 'website url to be crawlled ' })
  url: string;
}
