import { emailQueue } from "../config/queue";

export async function enqueueOrderEmail(
    orderId: number,
    userEmail: string
) {
    await emailQueue.add("send-email", {
        orderId,
        userEmail
    });
}