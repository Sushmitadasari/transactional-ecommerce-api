import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {

    const password = await bcrypt.hash("admin123", 10);

    await prisma.user.upsert({

        where: {
            email: "admin@shop.com"
        },

        update: {},

        create: {

            email: "admin@shop.com",

            passwordHash: password,

            role: "ADMIN",

            cart: {
                create: {}
            }

        }

    });

    console.log("Admin created");

}

main()
.finally(async () => {
    await prisma.$disconnect();
});