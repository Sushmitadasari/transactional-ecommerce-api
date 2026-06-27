import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Transactional E-Commerce API",
      version: "1.0.0",
      description:
        "REST API built with Express, TypeScript, Prisma, PostgreSQL, Redis, BullMQ and Docker.",
    },

    servers: [
      {
        url: "http://localhost:5000",
      },
    ],

    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },

      schemas: {
        Register: {
          type: "object",
          required: ["email", "password", "role"],
          properties: {
            email: {
              type: "string",
              example: "john@test.com",
            },
            password: {
              type: "string",
              example: "password123",
            },
            role: {
              type: "string",
              enum: ["ADMIN", "CUSTOMER"],
            },
          },
        },

        Login: {
          type: "object",
          required: ["email", "password"],
          properties: {
            email: {
              type: "string",
              example: "john@test.com",
            },
            password: {
              type: "string",
              example: "password123",
            },
          },
        },

        Product: {
          type: "object",
          required: [
            "name",
            "description",
            "price",
            "stockQuantity",
          ],
          properties: {
            name: {
              type: "string",
              example: "MacBook Pro",
            },
            description: {
              type: "string",
              example: "Apple M4 Laptop",
            },
            price: {
              type: "number",
              example: 189999,
            },
            stockQuantity: {
              type: "integer",
              example: 10,
            },
          },
        },

        CartItem: {
          type: "object",
          required: ["productId", "quantity"],
          properties: {
            productId: {
              type: "integer",
              example: 1,
            },
            quantity: {
              type: "integer",
              example: 2,
            },
          },
        },

        Order: {
          type: "object",
          properties: {
            id: {
              type: "integer",
              example: 1,
            },
            totalAmount: {
              type: "number",
              example: 379998,
            },
            status: {
              type: "string",
              example: "COMPLETED",
            },
          },
        },
      },
    },

    security: [
      {
        bearerAuth: [],
      },
    ],
  },

  apis: [
    "./src/routes/*.ts",
    "./dist/src/routes/*.js",
  ],
};

const specs = swaggerJsdoc(options);

export function setupSwagger(app: Express) {
  app.use(
    "/api/docs",
    swaggerUi.serve,
    swaggerUi.setup(specs, {
      explorer: true,
    })
  );
}