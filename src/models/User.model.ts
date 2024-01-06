import { Column, Entity, OneToMany } from 'typeorm';
import { AbstractModel } from './AbstractModel';
import { UserBook } from './UserBooks.model';

@Entity('users')
export class UserModel extends AbstractModel {
  @Column('varchar', { length: 200 })
  name: string;

  @OneToMany(() => UserBook, book => book.user, {
    createForeignKeyConstraints: false,
  })
  books: Array<UserBook>;
}
