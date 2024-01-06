import * as console from 'console';
import winston from 'winston';
import environment from './builders/envBuilder';
import { app } from './app';
import jobs from './jobs';
import { EnvironmentType } from './enums/environmentType';
import { DatabaseService } from './services/DatabaseService';

export const databaseService: DatabaseService = new DatabaseService();

export const logger = winston.createLogger({
  // Log only if level is less than (meaning more severe) or equal to this
  level: 'info',
  // Use timestamp and printf to create a standard log format
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`),
  ),
  // Log to the console and a file
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'logs/app.log' }),
  ],
});

const httpServer = app
  .listen(environment.port, async () => {
    console.log(`listening on port ${environment.port}`);
  }) //   Fix the Error EADDRINUSE
  .on('error', () => {
    process.once('SIGUSR2', () => {
      process.kill(process.pid, 'SIGUSR2');
    });
    process.on('SIGINT', () => {
      // this is only called on ctrl+c, not restart
      process.kill(process.pid, 'SIGINT');
    });
    process.on('uncaughtException', err => {
      console.log(`Uncaught Exception: ${err.message}`);
      process.exit(1);
    });
  });

(async () => {
  if (environment.nodeEnv === EnvironmentType.DEVELOPMENT) {
    await databaseService.initialize();
  }

  await httpServer;
  jobs();
})();

export default httpServer;
