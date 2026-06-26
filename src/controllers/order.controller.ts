import { Response } from "express";
import { AuthRequest } from "../middleware/auth.middleware";
import * as OrderService from "../services/order.service";

export async function checkout(
    req: AuthRequest,
    res: Response
) {

    try {

        const order =
            await OrderService.checkout(
                req.user.id
            );

        res.status(201).json({

            order_id: order.id,

            status: order.status,

            total_amount: order.totalAmount

        });

    } catch (err: any) {

        res.status(err.status || 400).json({

            error: err.message

        });

    }

}

export async function getOrder(
    req: AuthRequest,
    res: Response
) {

    try {

        const order =
            await OrderService.getOrder(

                req.user.id,

                Number(req.params.id)

            );

        res.json(order);

    } catch (err: any) {

        res.status(404).json({

            error: err.message

        });

    }

}