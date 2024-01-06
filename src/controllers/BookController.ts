import { Request } from 'express';
import { BookService } from '../services/BookService';
import { BookIndexResource } from '../resources/book/BookIndexResource';
import { BookCreateResource } from '../resources/book/BookCreateResource';
import { BorrowBookResource } from '../resources/book/BorrowBookResource';
import { ReturnBookResource } from '../resources/book/ReturnBookResource';
import { BookShowResource } from '../resources/book/BookShowResource';
import HttpStatusCode from '../enums/httpStatus.enum';
import BaseController from './BaseController.abstract';

export class BookController extends BaseController {
  private service: BookService;

  constructor() {
    super();
    this.service = new BookService();
  }

  public store = async (req: Request) => {
    const book = await this.service.createBook({ ...req.body });

    return new BookCreateResource({ statusCode: HttpStatusCode.CREATED, resource: book });
  };

  public index = async (req: Request) => {
    const books = await this.service.getBooks({});

    return new BookIndexResource({ statusCode: HttpStatusCode.OK, resource: books });
  };

  public show = async (req: Request) => {
    const { bookId } = req.params;

    const book = await this.service.getBook({
      params: { id: Number(bookId) },
    });

    return new BookShowResource({ statusCode: HttpStatusCode.OK, resource: book });
  };

  public borrowBook = async (req: Request) => {
    const { userId, bookId } = req.params;

    const userBook = await this.service.borrowBook({
      user_id: Number(userId),
      book_id: Number(bookId),
    });

    return new BorrowBookResource({
      statusCode: HttpStatusCode.CREATED,
      resource: userBook,
    });
  };

  public returnBook = async (req: Request) => {
    const { userId, bookId } = req.params;
    const { score } = req.body;

    const userBook = await this.service.returnBook({
      user_id: Number(userId),
      book_id: Number(bookId),
      score: score ? Number(score) : undefined,
    });

    return new ReturnBookResource({
      statusCode: HttpStatusCode.OK,
      resource: userBook,
    });
  };
}
