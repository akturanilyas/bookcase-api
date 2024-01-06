import { AbstractResource } from '../AbstractResource';
import { User } from '../../models/User';
import { UserBook } from '../../models/UserBooks';

export class UserShowResource extends AbstractResource {
  public toJson(resource: object): object {
    const user = resource as User;

    return {
      id: user.id,
      name: user.name,
      books: {
        past: this.getPastData(user.books.filter(history => history.delivery_date)),
        present: this.getPresentData(
          user.books.filter(history => !history.delivery_date),
        ),
      },
    };
  }

  private getPresentData(books: Array<UserBook>) {
    return books.map(history => ({
      name: history.book.name,
    }));
  }

  private getPastData(books: Array<UserBook>) {
    return books.map(history => ({
      name: history.book.name,
      score: history.score,
    }));
  }
}
