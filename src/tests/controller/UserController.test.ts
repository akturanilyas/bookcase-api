import { describe, expect } from '@jest/globals';
import { ENDPOINT } from '../../constants/endpoint.constant';
import {
  getRequest,
  matchArrayKeys,
  matchObjectKeys,
  postRequest,
} from '../../utils/testUtils';
import { BookService } from '../../services/BookService';
import { UserService } from '../../services/UserService';
import HttpStatusCode from '../../enums/httpStatus.enum';

describe('UserController', () => {
  it('check user create endpoint', async () => {
    const res = await postRequest({
      path: ENDPOINT.USERS,
      body: { name: 'first name' },
    });

    expect(res.statusCode).toBe(HttpStatusCode.CREATED);
    matchObjectKeys(res.body, ['id', 'name']);
  });

  it('check user index endpoint', async () => {
    await postRequest({
      path: ENDPOINT.USERS,
      body: { name: 'first name' },
    });

    const res = await getRequest({
      path: ENDPOINT.USERS,
    });

    expect(res.statusCode).toBe(HttpStatusCode.OK);
    expect(res.body).toBeInstanceOf(Array);
    expect(res.body).toHaveLength(1);
    matchArrayKeys(res.body, ['id', 'name']);
  });

  it('check user show endpoint', async () => {
    const book = await new BookService().createBook({ name: 'Book 1' });
    const book2 = await new BookService().createBook({ name: 'Book 2' });
    const book3 = await new BookService().createBook({ name: 'Book 3' });

    const _user = await new UserService().createUser({
      name: 'First name',
    });

    await new BookService().borrowBook({
      user_id: _user.id,
      book_id: book.id,
    });

    await new BookService().borrowBook({
      user_id: _user.id,
      book_id: book2.id,
    });

    await new BookService().borrowBook({
      user_id: _user.id,
      book_id: book3.id,
    });

    await new BookService().returnBook({
      user_id: _user.id,
      book_id: book.id,
      score: 5,
    });

    let res = await getRequest({
      path: `${ENDPOINT.USERS}/${_user.id}`,
    });

    expect(res.statusCode).toBe(HttpStatusCode.OK);
    matchObjectKeys(res.body, ['id', 'name', 'books']);
    expect(res.body.books.past[0].score).toBe(5);
    expect(res.body.books.past).toHaveLength(1);
    expect(res.body.books.present).toHaveLength(2);

    await new BookService().returnBook({
      user_id: _user.id,
      book_id: book2.id,
      score: 8,
    });

    res = await getRequest({
      path: `${ENDPOINT.USERS}/${_user.id}`,
    });

    expect(res.body.books.past[0].score).toBe(5);
    expect(res.body.books.past[1].score).toBe(8);
    expect(res.body.books.past).toHaveLength(2);
    expect(res.body.books.present).toHaveLength(1);
  });

  it('check throw user not found exception', async () => {
    const res = await getRequest({
      path: `${ENDPOINT.USERS}/${1}`,
    });

    expect(res.statusCode).toBe(HttpStatusCode.NOT_FOUND);
  });
});
