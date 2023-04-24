import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { QueryTypes, and, Op } from 'sequelize';
import CrawlModel from '@/crawl/models/crawl.model';
import DocumentModel from '@/crawl/models/document.model';
import CrawlEntity from '@/crawl/entities/crawl.enttity';
import cherrio from 'cheerio';
import * as dayjs from 'dayjs';
import {
  normalizeURL,
  fetchHtml,
  getUrlPrefix,
  getSubUrls,
} from '@/utils/html.util';
import { trySetCache } from '@/utils/cache.util';

@Injectable()
export class CrawlService {
  constructor(
    @InjectModel(CrawlModel)
    private readonly crawlModel: typeof CrawlModel,
    @InjectModel(DocumentModel)
    private readonly documentModel: typeof DocumentModel,
  ) {}

  async create(crawlObj: CrawlEntity): Promise<CrawlModel> {
    // normalize URL
    const urlStr = normalizeURL(crawlObj.url);
    console.log('1==>', crawlObj);

    // deduplicate url in local cache
    if (!trySetCache(urlStr)) {
      console.log('q==>', urlStr);
      return new Promise<CrawlModel>((resolve) => {
        resolve(null);
      });
    }

    // save request metadata
    crawlObj.creator = 1;
    const o = await this.crawlModel.create(crawlObj);
    // console.log('2==>', o.id);

    // fetch html and store in database
    const htmlStr = await fetchHtml(urlStr);
    this.documentModel.removeAttribute('id');
    await this.documentModel.create({ crawlId: o.id, html: htmlStr });

    // fetch sub urls
    await this.fetchSubUrls(o.id, urlStr, htmlStr);

    return o;
  }

  fetchSubUrls = async (pid: number, urlStr: string, htmlStr: string) => {
    const $ = cherrio.load(htmlStr);
    const prefix = getUrlPrefix(urlStr);
    const subUrls = getSubUrls($, prefix);

    for (const url of subUrls) {
      const obj = new CrawlEntity();
      obj.creator = 1;
      obj.pid = pid;
      obj.url = url;

      await this.create(obj);
    }
  };

  async findAll(): Promise<CrawlEntity[]> {
    const data = await this.crawlModel.sequelize.query<CrawlEntity>(
      'select id, url from t_crawl where pid is null',
      { type: QueryTypes.SELECT },
    );
    console.log('s==>', data);
    return data;
  }

  async findRecentDays(days: number): Promise<CrawlEntity[]> {
    const date = this.getDate(days);
    console.log(date);
    const data = await this.crawlModel.findAll({
      where: and({ pid: null }, { cdate: { [Op.gte]: date } }),
    });

    return data;
  }

  getDate(days: number): string {
    console.log('days', days);
    const newDate = dayjs()
      .add(-1 * days, 'day')
      .format('YYYY-MM-DD HH:mm:ss');

    return newDate;
  }
}
