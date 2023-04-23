import { Sequelize, Column, Model, Table } from 'sequelize-typescript';
import { DataTypes, InferAttributes, InferCreationAttributes } from 'sequelize';

@Table({ tableName: 't_crawl' })
export default class CrawlModel extends Model<
  InferAttributes<CrawlModel>,
  InferCreationAttributes<CrawlModel>
> {
  @Column({
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column
  url: string;

  @Column({ field: 'pid' })
  pid: number;

  @Column({
    field: 'cdate',
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP(2)'),
  })
  createDate: Date;

  @Column
  creator: number;

  @Column({ field: 'is_deleted', defaultValue: false })
  isDeleted: boolean;
}
