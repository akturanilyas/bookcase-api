import { Column, Entity, OneToMany } from 'typeorm';
import { AbstractModel } from './AbstractModel';
import { UserBook } from './UserBooks';

@Entity('users')
export class User extends AbstractModel {
  @Column('varchar', { length: 200 })
  name: string;

  @OneToMany(() => UserBook, book => book.user, {
    createForeignKeyConstraints: false,
  })
  books: Array<UserBook>;
}
