import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { AbstractModel } from './AbstractModel';
import { User } from './User';
import { Book } from './Book';

@Entity('user_books')
export class UserBook extends AbstractModel {
  @Column({ type: 'bigint' })
  user_id: number;

  @Column({ type: 'bigint' })
  book_id: number;

  @Column({ type: 'datetime', nullable: true })
  delivery_date: Date;

  @Column({
    type: 'int',
    nullable: true,
  })
  score?: number;

  @ManyToOne(() => User, user => user.books, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: User;

  @ManyToOne(() => Book, book => book.history, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'book_id', referencedColumnName: 'id' })
  book: Book;
}
