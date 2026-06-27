# Architecture Overview

## System Architecture

The Transactional E-Commerce API follows a layered architecture that separates routing, business logic, data access, caching, and background processing. This design improves maintainability, scalability, and testability.

```text
                    Client (Postman / Frontend)
                              │
                              │ HTTP Request
                              ▼
                    ┌────────────────────┐
                    │    Express API     │
                    │  (Node.js + TS)    │
                    └─────────┬──────────┘
                              │
         ┌────────────────────┼────────────────────┐
         │                    │                    │
         ▼                    ▼                    ▼
 Authentication         Product Service      Order Service
     JWT                 Redis Cache      ACID Transactions
 Role Authorization          │          Optimistic Locking
                              │
                              ▼
                         Redis Cache
                              │
                              ▼
                      PostgreSQL Database
                              │
                              ▼
                       BullMQ Job Queue
                              │
                              ▼
                    Background Worker
                              │
                              ▼
               Order Confirmation Email
```

---

# Architecture Layers

## 1. Routes Layer

The Routes layer defines all API endpoints and maps incoming HTTP requests to their corresponding controllers.

Examples:

* Authentication Routes
* Product Routes
* Cart Routes
* Order Routes

---

## 2. Controller Layer

Controllers receive requests from Express, validate inputs, invoke service methods, and return HTTP responses.

Responsibilities:

* Parse request data
* Handle exceptions
* Return status codes
* Send JSON responses

Controllers do not contain business logic.

---

## 3. Service Layer

The Service layer contains the core business logic of the application.

Responsibilities include:

* User registration and login
* Product CRUD operations
* Shopping cart management
* Checkout workflow
* Redis cache handling
* Database transactions
* Optimistic locking
* Queueing background jobs

Keeping business logic inside services improves maintainability and testing.

---

## 4. Database Layer

PostgreSQL stores all transactional data.

Main entities:

* User
* Product
* Cart
* CartItem
* Order
* OrderItem

Prisma ORM is used for database access and transaction management.

---

## 5. Redis Cache

Redis implements the Cache-Aside pattern for product listings.

Workflow:

1. Check Redis for cached products.
2. If cache exists, return cached data.
3. Otherwise fetch from PostgreSQL.
4. Store result in Redis.
5. Return response.

Cache is automatically invalidated whenever products are created, updated, or deleted.

Benefits:

* Reduced database load
* Faster response times
* Improved scalability

---

## 6. Optimistic Locking

Each Product record contains a version field.

Checkout process:

1. Read current product version.
2. Verify stock availability.
3. Update stock only if version matches.
4. Increment version.
5. Roll back transaction if another checkout modified the product.

This prevents overselling during concurrent purchases.

---

## 7. Database Transactions

Checkout executes inside a single Prisma transaction.

Transaction Steps:

* Validate cart
* Validate stock
* Update inventory
* Create order
* Create order items
* Clear cart
* Commit transaction

If any step fails, the entire transaction is rolled back, ensuring data consistency.

---

## 8. Background Jobs

BullMQ processes asynchronous tasks.

Current implementation:

* Order confirmation email simulation

The API places a job into the queue after a successful checkout.

The worker consumes the job independently, preventing slow operations from blocking API responses.

---

# Request Flow

## Product Listing

```text
Client
   │
GET /products
   │
   ▼
Redis Cache
   │
 ┌─┴────────────┐
 │              │
Hit            Miss
 │              │
 ▼              ▼
Return      PostgreSQL
Cache          │
               ▼
          Save to Redis
               │
               ▼
         Return Products
```

---

## Checkout Flow

```text
Customer
     │
POST /orders
     │
     ▼
Validate JWT
     │
     ▼
Load Cart
     │
     ▼
Validate Stock
     │
     ▼
Optimistic Lock
(version check)
     │
     ▼
Database Transaction
     │
     ▼
Create Order
     │
     ▼
Clear Cart
     │
     ▼
Commit
     │
     ▼
Push BullMQ Job
     │
     ▼
Return Response
     │
     ▼
Background Worker
     │
     ▼
Email Notification
```

---

# Design Principles

* Layered Architecture
* Separation of Concerns
* Stateless REST APIs
* Role-Based Access Control
* Cache-Aside Strategy
* ACID Transactions
* Optimistic Concurrency Control
* Asynchronous Processing
* Dockerized Deployment

---

# Technology Stack

| Component        | Technology      |
| ---------------- | --------------- |
| Runtime          | Node.js         |
| Framework        | Express.js      |
| Language         | TypeScript      |
| ORM              | Prisma          |
| Database         | PostgreSQL      |
| Cache            | Redis           |
| Queue            | BullMQ          |
| Authentication   | JWT             |
| Password Hashing | bcrypt          |
| Validation       | Zod             |
| Containerization | Docker          |
| API Testing      | Postman         |
| Documentation    | Swagger/OpenAPI |
