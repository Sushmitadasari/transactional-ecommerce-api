import { Worker } from "bullmq";

new Worker(
  "emailQueue",
  async (job) => {
    console.log(job.data);
  },
  {
    connection: {
      host: process.env.REDIS_HOST!,
      port: Number(process.env.REDIS_PORT),
    },
  }
);