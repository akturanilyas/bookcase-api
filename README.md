# What is the purpose?

Basic bookcase applications server-side applications.

## Environment Variables

| Parameter       | Type      | Description                                                       |
|:----------------|:----------|:------------------------------------------------------------------|
| `api_key`       | `string`  | **Required**. Your API key                                        |
| `NODE_ENV`      | `string`  | **Required**. Environment type. (production - development - test) |
| `PORT`          | `number`  | *Optional*. App's served port. Default: 3000                      |
| `HOST`          | `number`  | *Optional*. Database's served URL. Default: localhost             |
| `DB_USERNAME`   | `string`  | **Required**. Database username.                                  |
| `DB_PASSWORD`   | `string`  | **Required**. Database password.                                  |
| `DATABASE`      | `string`  | **Required**. Database schema name.                               |
| `DEBUG_ENABLED` | `boolean` | *Optional*. ORM logging enabled status. Default:`false`           |

## Installation

- Create `.env` files. Example is below.

```env
NODE_ENV=development
PORT=3000
HOST=localhost
DB_USERNAME='root'
DB_PASSWORD=''
DATABASE='test'
DEBUG_ENABLED=false
```

## Dependencies
- yarn 
- Node 18 (18.15 preferable) 
- MySQL 8 

Install packages with yarn

```bash
  yarn install
```

## Running Tests

To run tests, run the following command

```bash
  yarn run test
```


## Run in Development

```bash
  yarn run dev
```

## Run in Production

```bash
  yarn build && yarn start
```

- `class-validator`
- `express`
- `express-validator`
- `lodash`
- `moment`
- `mysql`
- `typeorm`
- `winston`
- `husky`
- `eslint`
- `prettier`
- `supertest`
- `nodemon`
- `sqlite3`
