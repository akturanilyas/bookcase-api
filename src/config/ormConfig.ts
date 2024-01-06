import { DataSourceOptions } from 'typeorm/data-source/DataSourceOptions';
import environment from '../builders/envBuilder';

const entities = {
  development: ['src/models/**/*.ts'],
  test: ['src/models/**/*.ts'],
  production: ['dist/models/**/*.js'],
};

export const ormConfig: DataSourceOptions = {
  type: 'mysql',
  host: environment.host,
  port: 3306,
  username: environment.username,
  password: environment.password,
  database: environment.database,
  synchronize: true,
  migrationsTableName: 'migrations',
  logging: environment.debugEnabled,
  logger: 'file',
  entities: entities[environment.nodeEnv],
  subscribers: ['src/subscriber/**/*{.ts,.js}'],
  migrations: ['src/migrations/**/*{.ts,.js}'],
  dropSchema: false,
  extra: {
    charset: 'utf8mb4_unicode_ci',
  },
};

export const testOrmConfig: DataSourceOptions = {
  type: 'better-sqlite3',
  database: ':memory:',
  dropSchema: true,
  entities: ['src/models/**/*.ts', 'dist/models/**/*.js'],
  synchronize: true,
  logging: false,
  migrations: ['src/migration/**/*.ts'],
  subscribers: ['src/subscriber/**/*.ts'],
  extra: {
    charset: 'utf8mb4_unicode_ci',
  },
};
