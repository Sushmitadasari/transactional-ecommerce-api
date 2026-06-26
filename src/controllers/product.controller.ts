import { Request, Response } from "express";
import * as ProductService from "../services/product.service";

export async function getProducts(req: Request, res: Response) {

    const products = await ProductService.getProducts(
        req.query.sort as string
    );

    res.json(products);

}

export async function getProduct(req: Request, res: Response) {

    const product = await ProductService.getProduct(
        Number(req.params.id)
    );

    if (!product)
        return res.status(404).json({
            error: "Product not found"
        });

    res.json(product);

}

export async function createProduct(req: Request, res: Response) {

    const product = await ProductService.createProduct(
        req.body
    );

    res.status(201).json(product);

}

export async function updateProduct(req: Request, res: Response) {

    const product = await ProductService.updateProduct(
        Number(req.params.id),
        req.body
    );

    res.json(product);

}

export async function deleteProduct(req: Request, res: Response) {

    await ProductService.deleteProduct(
        Number(req.params.id)
    );

    res.status(204).send();

}