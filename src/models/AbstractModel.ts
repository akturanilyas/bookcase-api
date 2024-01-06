import {
  BaseEntity,
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { SaveOptions } from 'typeorm/repository/SaveOptions';
import { databaseService } from '../server';

export class AbstractModel extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;

  public override async save(options?: SaveOptions): Promise<this> {
    const entity = await databaseService.transaction.save(this, options);

    return entity;
  }
}
