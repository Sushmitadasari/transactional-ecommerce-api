import prisma from "../config/prisma";

export async function getCart(userId: number) {

    const cart = await prisma.cart.findUnique({
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

    return cart;

}

export async function addItem(
    userId: number,
    productId: number,
    quantity: number
) {

    const cart = await prisma.cart.findUnique({
        where: {
            userId
        }
    });

    if (!cart)
        throw new Error("Cart not found");

    const product = await prisma.product.findUnique({
        where: {
            id: productId
        }
    });

    if (!product)
        throw new Error("Product not found");

    const existing = await prisma.cartItem.findUnique({
        where: {
            cartId_productId: {
                cartId: cart.id,
                productId
            }
        }
    });

    if (existing) {

        return prisma.cartItem.update({

            where: {
                id: existing.id
            },

            data: {
                quantity
            }

        });

    }

    return prisma.cartItem.create({

        data: {

            cartId: cart.id,

            productId,

            quantity

        }

    });

}

export async function removeItem(
    userId: number,
    itemId: number
) {

    const cart = await prisma.cart.findUnique({
        where: {
            userId
        }
    });

    if (!cart)
        throw new Error("Cart not found");

    const item = await prisma.cartItem.findFirst({

        where: {

            id: itemId,

            cartId: cart.id

        }

    });

    if (!item)
        throw new Error("Item not found");

    await prisma.cartItem.delete({

        where: {
            id: item.id
        }

    });

}