import { CronJob } from "cron";

export const todoExpireJob = () => {
  const job = new CronJob("* * * * *", async () => {
    try {
    } catch (error) {
      throw new Error(`Error `);
    }
  });
  job.start();
};
