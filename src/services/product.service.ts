import prisma from "../config/prisma";
import redis from "../config/redis";
import { Prisma } from "@prisma/client";

const CACHE_KEY = "products:all";
const TTL = 300;

export async function getProducts(sort?: string) {
  const cached = await redis.get(CACHE_KEY);

  if (cached) {
    return JSON.parse(cached);
  }

  let orderBy: Prisma.ProductOrderByWithRelationInput = {
    id: "asc",
  };

  if (sort === "price_asc") {
    orderBy = {
      price: "asc",
    };
  }

  if (sort === "price_desc") {
    orderBy = {
      price: "desc",
    };
  }

  const products = await prisma.product.findMany({
    orderBy,
  });

  await redis.set(CACHE_KEY, JSON.stringify(products), "EX", TTL);

  return products;
}

export async function getProduct(id: number) {
  return prisma.product.findUnique({
    where: { id },
  });
}

export async function createProduct(data: any) {
  const product = await prisma.product.create({
    data,
  });

  await redis.del(CACHE_KEY);

  return product;
}

export async function updateProduct(id: number, data: any) {
  const product = await prisma.product.update({
    where: { id },
    data,
  });

  await redis.del(CACHE_KEY);

  return product;
}

export async function deleteProduct(id: number) {
  await prisma.product.delete({
    where: { id },
  });

  await redis.del(CACHE_KEY);
}