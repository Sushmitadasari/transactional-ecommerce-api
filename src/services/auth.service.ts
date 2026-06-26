import prisma from "../config/prisma";
import { hashPassword, comparePassword } from "../utils/hash";
import { generateToken } from "../utils/jwt";

export async function register(data: any) {

    const exists = await prisma.user.findUnique({
        where: {
            email: data.email
        }
    });

    if (exists)
        throw new Error("Email already exists");

    const passwordHash = await hashPassword(
        data.password
    );

    const user = await prisma.user.create({

        data: {

            email: data.email,

            passwordHash,

            role: data.role,

            cart: {
                create: {}
            }

        }

    });

    return {

        id: user.id,

        email: user.email,

        role: user.role

    };

}

export async function login(data: any) {

    const user = await prisma.user.findUnique({

        where: {
            email: data.email
        }

    });

    if (!user)
        throw new Error("Invalid credentials");

    const ok = await comparePassword(

        data.password,

        user.passwordHash

    );

    if (!ok)
        throw new Error("Invalid credentials");

    return {

        token: generateToken(user)

    };

}