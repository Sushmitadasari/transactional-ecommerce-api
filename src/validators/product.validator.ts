import { z } from "zod";

export const productSchema = z.object({

    name: z.string().min(2),

    description: z.string().min(5),

    price: z.number().positive(),

    stock_quantity: z.number().int().min(0)

});