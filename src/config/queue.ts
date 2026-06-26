import { Queue } from "bullmq";

export const emailQueue = new Queue("emailQueue", {
  connection: {
    host: process.env.REDIS_HOST!,
    port: Number(process.env.REDIS_PORT),
  },
});