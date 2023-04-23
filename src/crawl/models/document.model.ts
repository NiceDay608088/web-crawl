import { Sequelize, Column, Model, Table } from 'sequelize-typescript';
import { InferAttributes, InferCreationAttributes } from 'sequelize';

@Table({ tableName: 't_document' })
export default class DocumentModel extends Model<
  InferAttributes<DocumentModel>,
  InferCreationAttributes<DocumentModel>
> {
  @Column({ field: 'crawl_id' })
  crawlId: number;

  @Column
  html: string;

  @Column({
    field: 'cdate',
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP(2)'),
  })
  createDate: Date;

  @Column({ field: 'is_deleted', defaultValue: false })
  isDeleted: boolean;
}
