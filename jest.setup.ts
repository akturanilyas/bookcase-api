import 'dotenv/config';
import { databaseService } from './src/server';

beforeEach(async () => {
  await databaseService.clearDatabase();
});

beforeAll(async () => {
  try {
    await databaseService.initializeForTests();

    await databaseService.source.transaction(async transaction => {
      databaseService.transaction = transaction;
    });
  } catch (error) {
    console.log(error);
  }
});

afterAll(async () => {
  await databaseService.destroy();
});
