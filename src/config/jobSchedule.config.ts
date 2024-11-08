import { CronJob } from "cron";
import Task from "../entities/task.entity";

export const scheduleTaskReminder = () => {
  const job = new CronJob("0 9 * * *", async () => {
    try {
      const today = new Date();
      const expiringTasks = await Task.find({
        expiresAt: today,
        status: { $ne: "completed" },
      });

      // Send a notification for each expiring task
      // for (const task of expiringTasks) {
      //   await sendNotification(
      //     task.userId,
      //     `Your task "${task.taskName}" expires today!`
      //   );
      // }
    } catch (error) {
      throw new Error(`Error `);
    }
  });
  job.start();
};
