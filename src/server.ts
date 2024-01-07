import * as console from 'console';
import winston from 'winston';
import environment from './builders/envBuilder';
import { app } from './app';
import { EnvironmentTypeEnum } from './enums/environmentType.enum';
import { DatabaseService } from './services/DatabaseService';

export const databaseService: DatabaseService = new DatabaseService();

export const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`),
  ),
  transports: [new winston.transports.File({ filename: 'logs/app.log' })],
});

const httpServer = app
  .listen(environment.port, async () => {
    console.log(`listening on port ${environment.port}`);
  })
  .on('error', () => {
    process.once('SIGUSR2', () => {
      process.kill(process.pid, 'SIGUSR2');
    });
    process.on('SIGINT', () => {
      process.kill(process.pid, 'SIGINT');
    });
    process.on('uncaughtException', err => {
      console.log(`Uncaught Exception: ${err.message}`);
      process.exit(1);
    });
  });

(async () => {
  if (
    [EnvironmentTypeEnum.DEVELOPMENT, EnvironmentTypeEnum.PRODUCTION].includes(
      environment.nodeEnv as EnvironmentTypeEnum,
    )
  ) {
    await databaseService.initialize();
  }

  await httpServer;
})();

export default httpServer;
