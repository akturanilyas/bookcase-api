export type BookCreateParams = {
  name: string;
};

export type GetBooksParams = Partial<BookCreateParams> & {
  id?: number;
};

export type GetBookParams = GetBooksParams & {
  id: number;
};

export type BorrowBookParams = {
  user_id: number;
  book_id: number;
};

export type ReturnBookParams = {
  user_id: number;
  book_id: number;
  score?: number;
};
