import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";

export interface AuthRequest extends Request {
    user?: any;
}

export function authenticate(
    req: AuthRequest,
    res: Response,
    next: NextFunction
) {

    const header = req.headers.authorization;

    if (!header)
        return res.status(401).json({
            error: "Missing token"
        });

    const token = header.split(" ")[1];

    try {

        req.user = verifyToken(token);

        next();

    } catch {

        return res.status(401).json({
            error: "Invalid token"
        });

    }

}