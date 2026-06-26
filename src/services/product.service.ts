import prisma from "../config/prisma";
import redis from "../config/redis";

const CACHE_KEY = "products:all";
const TTL = 300; // 5 minutes

export async function getProducts(sort?: string) {

    const cached = await redis.get(CACHE_KEY);

    if (cached) {
        console.log("Redis Cache Hit");
        return JSON.parse(cached);
    }

    const orderBy =
        sort === "price_desc"
            ? { price: "desc" }
            : sort === "price_asc"
            ? { price: "asc" }
            : { id: "asc" };

    const products = await prisma.product.findMany({
        orderBy
    });

    await redis.set(
        CACHE_KEY,
        JSON.stringify(products),
        "EX",
        TTL
    );

    return products;
}

export async function getProduct(id: number) {

    return prisma.product.findUnique({
        where: { id }
    });

}

export async function createProduct(data: any) {

    const product = await prisma.product.create({
        data
    });

    await redis.del(CACHE_KEY);

    return product;

}

export async function updateProduct(
    id: number,
    data: any
) {

    const product = await prisma.product.update({
        where: { id },
        data
    });

    await redis.del(CACHE_KEY);

    return product;

}

export async function deleteProduct(id: number) {

    await prisma.product.delete({
        where: { id }
    });

    await redis.del(CACHE_KEY);

}