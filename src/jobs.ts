import { schedule } from 'node-cron';

const scheduler = (): void => {
  schedule('*/1 * * * *', () => {
    console.log('running a task every one minutes');
  });
};

export default scheduler;
