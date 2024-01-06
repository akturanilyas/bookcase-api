import { FindOptionsRelations } from 'typeorm/find-options/FindOptionsRelations';
import {
  BookCreateParams,
  BorrowBookParams,
  GetBookParams,
  GetBooksParams,
  ReturnBookParams,
} from './BookService.interface';
import { Book } from '../models/Book';
import { UserBook } from '../models/UserBooks';
import { BookNotFoundException } from '../exceptions/book/BookNotFoundException';
import { UserBookNotFoundException } from '../exceptions/book/UserBookNotFoundException';
import { UserService } from './UserService';
import { BookAlreadyReturnedException } from '../exceptions/book/BookAlreadyReturnedException';
import { databaseService } from '../server';
import { BookAlreadyBorrowedException } from '../exceptions/book/BookAlreadyBorrowedException';

export class BookService {
  public createBook = async (params: BookCreateParams): Promise<Book> => {
    const book = Book.create({ ...params });

    await book.save();

    return book;
  };

  public getBooks = async ({
    params,
    relations,
  }: {
    params?: GetBooksParams;
    relations?: FindOptionsRelations<Book>;
  }): Promise<Array<Book>> => {
    const books = Book.find({ where: params, relations });

    return books;
  };

  public getBook = async ({
    params,
    relations,
  }: {
    params: GetBookParams;
    relations?: FindOptionsRelations<Book>;
  }): Promise<Book> => {
    const book = await Book.findOne({ where: params, relations });

    if (!book) {
      throw new BookNotFoundException();
    }

    return book;
  };

  public borrowBook = async (params: BorrowBookParams) => {
    const { book_id, user_id } = params;

    await this.checkUserAndBookIsExists({ user_id, book_id });
    await this.checkBookIsBorrowable({ user_id, book_id });

    const userBook = await UserBook.create({ book_id, user_id }).save();

    return userBook;
  };

  public returnBook = async (params: ReturnBookParams) => {
    const { book_id, user_id, score } = params;

    await this.checkUserAndBookIsExists({ user_id, book_id });

    const userBook = await this.checkUserBookIsReturnable({ user_id, book_id });

    userBook.delivery_date = new Date();
    userBook.score = score;
    await userBook.save({ reload: true });

    score && (await this.setBookScore(book_id));

    return userBook;
  };

  public checkUserBookIsReturnable = async ({
    user_id,
    book_id,
  }: {
    user_id: number;
    book_id: number;
  }): Promise<UserBook> => {
    const userBook = await UserBook.findOne({ where: { book_id, user_id } });
    if (!userBook) {
      throw new UserBookNotFoundException();
    }

    if (userBook.delivery_date) {
      throw new BookAlreadyReturnedException();
    }

    return userBook;
  };

  private checkUserAndBookIsExists = async ({
    user_id,
    book_id,
  }: {
    user_id: number;
    book_id: number;
  }) => {
    await Promise.all([
      new UserService().getUser({ params: { id: user_id } }),
      this.getBook({ params: { id: book_id } }),
    ]);
  };

  private setBookScore = async (bookId: number) => {
    const queryRunner = databaseService.transaction.queryRunner!;
    await queryRunner.startTransaction('READ UNCOMMITTED');

    const { average } = await queryRunner.manager
      .createQueryBuilder(UserBook, 'userBook')
      .select('AVG(userBook.score)', 'average')
      .where('userBook.score IS NOT NULL')
      .where(`book_id = :bookId`, { bookId })
      .getRawOne();

    const book = await this.getBook({ params: { id: bookId } });

    book.score = average;
    await queryRunner.commitTransaction();

    await book.save({ reload: true });
  };

  private checkBookIsBorrowable = async ({
    user_id,
    book_id,
  }: {
    user_id: number;
    book_id: number;
  }) => {
    const userBook = await UserBook.findOne({ where: { book_id, user_id } });

    if (userBook) {
      throw new BookAlreadyBorrowedException();
    }

    return userBook;
  };
}
