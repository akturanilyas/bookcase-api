import { describe, expect } from '@jest/globals';
import { BookService } from '../../services/BookService';
import { BookModel } from '../../models/Book.model';
import { matchArrayKeys, matchObjectKeys } from '../../utils/testUtils';
import { UserService } from '../../services/UserService';

describe('BookService', () => {
  it('Check create book method', async () => {
    const res: BookModel | null = await new BookService().createBook({ name: 'Book 1' });

    expect(res).toBeInstanceOf(BookModel);
    matchObjectKeys(res, ['id', 'name']);
  });

  it('Check getBooks method', async () => {
    await new BookService().createBook({ name: 'Book 1' });
    await new BookService().createBook({ name: 'Book 2' });
    await new BookService().createBook({ name: 'Book 3' });

    const books = await new BookService().getBooks({});

    expect(books).toBeInstanceOf(Array<BookModel>);
    expect(books).toHaveLength(3);
    matchArrayKeys(books, ['id', 'name']);
  });

  it('Check borrowBook method', async () => {
    const book = await new BookService().createBook({ name: 'Book 1' });
    const user = await new UserService().createUser({
      name: 'First name',
    });

    const borrowBook = await new BookService().borrowBook({
      user_id: user.id,
      book_id: book.id,
    });

    expect(borrowBook.user_id).toBe(user.id);
    expect(borrowBook.book_id).toBe(book.id);
  });

  it('Check returnBook method', async () => {
    const book = await new BookService().createBook({ name: 'Book 1' });
    const user = await new UserService().createUser({
      name: 'First name',
    });

    const borrowBook = await new BookService().borrowBook({
      user_id: user.id,
      book_id: book.id,
    });

    const returnBook = await new BookService().returnBook({
      book_id: book.id,
      user_id: borrowBook.user_id,
      score: 6,
    });

    expect(returnBook.user_id).toBe(user.id);
    expect(returnBook.book_id).toBe(book.id);
    expect(returnBook.score).toBe(6);
  });

  it('check book score', async () => {
    let book = await new BookService().createBook({ name: 'Book 1' });
    const user = await new UserService().createUser({
      name: 'First name',
    });

    const user2 = await new UserService().createUser({
      name: 'First name',
    });

    await new BookService().borrowBook({
      user_id: user.id,
      book_id: book.id,
    });

    await new BookService().returnBook({
      user_id: user.id,
      book_id: book.id,
      score: 5,
    });

    await new BookService().borrowBook({
      user_id: user2.id,
      book_id: book.id,
    });

    await new BookService().returnBook({
      user_id: user2.id,
      book_id: book.id,
      score: 8,
    });

    book = await new BookService().getBook({
      params: { id: book.id },
    });

    expect(book.score).toBe(6.5);
  });

  it('check user take book 2 times', async () => {
    const book = await new BookService().createBook({ name: 'Book 1' });
    const user = await new UserService().createUser({
      name: 'First name',
    });

    await new BookService().borrowBook({
      user_id: user.id,
      book_id: book.id,
    });

    await new BookService().returnBook({
      user_id: user.id,
      book_id: book.id,
      score: 5,
    });

    await new BookService().borrowBook({
      user_id: user.id,
      book_id: book.id,
    });

    await new BookService().returnBook({
      user_id: user.id,
      book_id: book.id,
      score: 8,
    });

    const result = await BookModel.findOne({ where: { id: book.id } });

    expect(result?.score).toBe(6.5);
  });
});
