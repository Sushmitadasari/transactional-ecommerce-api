import { Response } from "express";
import { AuthRequest } from "../middleware/auth.middleware";
import * as CartService from "../services/cart.service";

export async function getCart(
    req: AuthRequest,
    res: Response
) {

    try {

        const cart = await CartService.getCart(req.user.id);

        res.json(cart);

    } catch (err: any) {

        res.status(400).json({
            error: err.message
        });

    }

}

export async function addItem(
    req: AuthRequest,
    res: Response
) {

    try {

        const item = await CartService.addItem(

            req.user.id,

            req.body.product_id,

            req.body.quantity

        );

        res.status(201).json(item);

    } catch (err: any) {

        res.status(400).json({
            error: err.message
        });

    }

}

export async function removeItem(
    req: AuthRequest,
    res: Response
) {

    try {

        await CartService.removeItem(

            req.user.id,

            Number(req.params.id)

        );

        res.status(204).send();

    } catch (err: any) {

        res.status(400).json({
            error: err.message
        });

    }

}