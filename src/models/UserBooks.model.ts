import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { IsInt, Max, Min } from 'class-validator';
import { AbstractModel } from './AbstractModel';
import { UserModel } from './User.model';
import { BookModel } from './Book.model';

@Entity('user_books')
@Index(['user_id', 'book_id'])
export class UserBook extends AbstractModel {
  @Column({ type: 'bigint' })
  user_id: number;

  @Column({ type: 'bigint' })
  book_id: number;

  @Column({ type: 'datetime', nullable: true })
  delivery_date: Date;

  @IsInt()
  @Min(0)
  @Max(10)
  @Column({
    type: 'int',
    nullable: true,
  })
  score?: number;

  @ManyToOne(() => UserModel, user => user.books, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: UserModel;

  @ManyToOne(() => BookModel, book => book.history, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'book_id', referencedColumnName: 'id' })
  book: BookModel;
}
