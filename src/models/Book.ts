import { Column, Entity, OneToMany } from 'typeorm';
import { AbstractModel } from './AbstractModel';
import { UserBook } from './UserBooks';

@Entity('books')
export class Book extends AbstractModel {
  @Column('varchar', { length: 200 })
  name: string;

  @Column({
    type: 'float',
    nullable: false,
    default: -1,
  })
  score?: number;

  @OneToMany(() => UserBook, book => book.user, {
    createForeignKeyConstraints: false,
  })
  history: Array<UserBook>;
}
