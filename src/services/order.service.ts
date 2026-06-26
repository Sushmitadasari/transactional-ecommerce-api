import prisma from "../config/prisma";
import { enqueueOrderEmail } from "../jobs/email.job";
import { Prisma } from "@prisma/client";
export async function checkout(userId: number) {

    const user = await prisma.user.findUnique({
        where: { id: userId }
    });

    if (!user)
        throw new Error("User not found");

   const order = await prisma.$transaction(
  async (tx: Prisma.TransactionClient) => {

        const cart = await tx.cart.findUnique({

            where: {
                userId
            },

            include: {

                items: {
                    include: {
                        product: true
                    }
                }

            }

        });

        if (!cart || cart.items.length === 0)
            throw new Error("Cart is empty");

        let total = 0;

        for (const item of cart.items) {

            const product = await tx.product.findUnique({
                where: {
                    id: item.productId
                }
            });

            if (!product)
                throw new Error("Product not found");

            if (product.stockQuantity < item.quantity)
                throw new Error(
                    `Insufficient stock for ${product.name}`
                );

            const updated = await tx.product.updateMany({

                where: {

                    id: product.id,

                    version: product.version

                },

                data: {

                    stockQuantity: {
                        decrement: item.quantity
                    },

                    version: {
                        increment: 1
                    }

                }

            });

            if (updated.count === 0) {

                const err: any = new Error(
                    "Optimistic locking conflict"
                );

                err.status = 409;

                throw err;

            }

            total +=
                Number(product.price) * item.quantity;

        }

        const createdOrder = await tx.order.create({

            data: {

                userId,

                totalAmount: total,

                status: "COMPLETED"

            }

        });

        for (const item of cart.items) {

            await tx.orderItem.create({

                data: {

                    orderId: createdOrder.id,

                    productId: item.productId,

                    quantity: item.quantity,

                    unitPriceAtPurchase:
                        item.product.price

                }

            });

        }

        await tx.cartItem.deleteMany({

            where: {

                cartId: cart.id

            }

        });

        return createdOrder;

    });

    await enqueueOrderEmail(
        order.id,
        user.email
    );

    return order;

}
export async function getOrder(
    userId: number,
    orderId: number
) {

    const order = await prisma.order.findFirst({

        where: {

            id: orderId,

            userId

        },

        include: {

            items: true

        }

    });

    if (!order)
        throw new Error("Order not found");

    return order;

}