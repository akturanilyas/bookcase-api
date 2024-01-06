import dotenv from 'dotenv';
import * as process from 'process';

dotenv.config();

type IEnvironment = {
  nodeEnv: string;
  port: number;
  host: string;
  username: string;
  password: string;
  database: string;
  debugEnabled: boolean;
};

const environment: IEnvironment = {
  nodeEnv: process.env.NODE_ENV || 'test',
  port: parseInt(process.env.PORT!, 0) || 3000,
  host: process.env.HOST || 'localhost',
  username: process.env.DB_USERNAME!,
  password: process.env.DB_PASSWORD!,
  database: process.env.DATABASE!,
  debugEnabled: Boolean(process.env.DEBUG_ENABLED) || false,
};

export default environment;
