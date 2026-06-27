# Transactional E-Commerce API

A production-inspired RESTful e-commerce backend built with **Node.js, Express, TypeScript, Prisma, PostgreSQL, Redis, BullMQ, and Docker**. The project demonstrates secure authentication, role-based authorization, optimistic locking, ACID transactions, Redis caching, and asynchronous background job processing.

---

# Features

* JWT Authentication
* Role-Based Access Control (ADMIN & CUSTOMER)
* Product CRUD Operations
* Redis Cache-Aside Strategy
* Shopping Cart Management
* ACID Transactions using Prisma
* Optimistic Locking for Checkout
* BullMQ Background Job Processing
* Order Management
* Dockerized Deployment
* Swagger API Documentation
* Jest & Supertest Testing
* GitHub Actions CI

---

# Tech Stack

| Technology | Purpose            |
| ---------- | ------------------ |
| Node.js    | Runtime            |
| Express.js | REST API           |
| TypeScript | Language           |
| Prisma ORM | Database ORM       |
| PostgreSQL | Database           |
| Redis      | Cache              |
| BullMQ     | Background Jobs    |
| Docker     | Containerization   |
| JWT        | Authentication     |
| bcrypt     | Password Hashing   |
| Zod        | Request Validation |

---

# Architecture

```
Client
   │
   ▼
Express API
   │
   ├────────► PostgreSQL
   │
   ├────────► Redis Cache
   │
   └────────► BullMQ Queue
                    │
                    ▼
             Background Worker
                    │
                    ▼
          Order Confirmation Email
```

---

# Database Schema

```
User
 ├── Cart
 │     └── CartItem
 │              └── Product
 │
 └── Order
       └── OrderItem
               └── Product
```

---

# Project Structure

```
transactional-ecommerce-api
│
├── prisma/
├── src/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── routes/
│   ├── services/
│   ├── validators/
│   ├── jobs/
│   └── utils/
│
├── worker/
├── tests/
├── docs/
├── docker-compose.yml
├── Dockerfile
├── worker.Dockerfile
├── package.json
└── README.md
```

---

# Installation

## Clone Repository

```bash
git clone https://github.com/your-username/transactional-ecommerce-api.git

cd transactional-ecommerce-api
```

---

## Install Dependencies

```bash
npm install
```

---

## Configure Environment

Create a `.env` file.

Example:

```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/ecommerce?schema=public

JWT_SECRET=supersecret

PORT=5000

REDIS_HOST=localhost
REDIS_PORT=6379
```

For Docker:

```env
DATABASE_URL=postgresql://postgres:postgres@postgres:5432/ecommerce?schema=public

REDIS_HOST=redis
REDIS_PORT=6379
```

---

## Run with Docker

```bash
docker compose up --build -d
```

---

## Run Prisma Migration

```bash
docker compose exec api npx prisma migrate dev
```

---

## Seed Database

```bash
docker compose exec api npm run seed
```

---

## Start Development Server

```bash
npm run dev
```

---

# API Endpoints

## Authentication

| Method | Endpoint           |
| ------ | ------------------ |
| POST   | /api/auth/register |
| POST   | /api/auth/login    |

---

## Products

| Method | Endpoint          |
| ------ | ----------------- |
| GET    | /api/products     |
| GET    | /api/products/:id |
| POST   | /api/products     |
| PUT    | /api/products/:id |
| DELETE | /api/products/:id |

---

## Cart

| Method | Endpoint            |
| ------ | ------------------- |
| GET    | /api/cart           |
| POST   | /api/cart/items     |
| DELETE | /api/cart/items/:id |

---

## Orders

| Method | Endpoint        |
| ------ | --------------- |
| POST   | /api/orders     |
| GET    | /api/orders/:id |

---

# Authentication

The API uses JWT Authentication.

Example:

```
Authorization: Bearer <JWT_TOKEN>
```

---

# Role-Based Access

### ADMIN

* Create Products
* Update Products
* Delete Products

### CUSTOMER

* Browse Products
* Manage Cart
* Checkout
* View Orders

---

# Optimistic Locking

Each product contains a version column.

During checkout:

1. Read product version.
2. Verify stock.
3. Update only if version matches.
4. Increment version.
5. Roll back transaction if another checkout modified the product.

This prevents overselling under concurrent requests.

---

# Redis Cache

Product listing uses the Cache-Aside Pattern.

* First request → Database
* Subsequent requests → Redis

Cache invalidates automatically after product updates.

---

# Background Jobs

BullMQ processes asynchronous jobs.

Current implementation:

* Order Confirmation Email Simulation

The worker consumes jobs independently of the API.

---

# Running Tests

```bash
npm test
```

---

# Swagger Documentation

```
http://localhost:5000/api/docs
```

---

# Docker Services

* API
* PostgreSQL
* Redis
* Background Worker

---

# CI/CD

GitHub Actions automatically:

* Install dependencies
* Generate Prisma Client
* Build project
* Run tests

---

# Future Improvements

* Refresh Tokens
* Stripe Payment Integration
* Inventory Reservation
* Email Service Integration
* Kubernetes Deployment
* Prometheus Monitoring
* Rate Limiting
* Pagination & Filtering
* Product Categories
* Wishlist
* Image Uploads

---

# Author

**Sushmita Dasari**
