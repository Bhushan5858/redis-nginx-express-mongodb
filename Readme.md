# 🚀 E-commerce Backend with Redis & Nginx Caching

## 📌 Overview

This project is a production-style backend system built using **Node.js, Express, MongoDB, Redis, and Nginx**.

It demonstrates:

* API development
* Redis-based caching
* Nginx reverse proxy + API caching
* Docker-based infrastructure

---

## 🏗️ Architecture

```
Client
  ↓
Nginx (Reverse Proxy + Cache)
  ↓
Backend (Node.js + Express)
  ↓        ↓
Redis      MongoDB
(Cache)    (Database)
```

---

## ⚙️ Tech Stack

* **Backend:** Node.js, Express, TypeScript
* **Database:** MongoDB
* **Caching:** Redis
* **Reverse Proxy & Load Balancer:** Nginx
* **Containerization:** Docker

---

## 🔥 Features

### ✅ Backend API

* Create product
* Get all products
* Get product by ID

---

### ⚡ Redis Caching (Application Level)

* Caches individual product:

  ```
  GET /products/:id
  ```
* Reduces database load
* TTL-based caching

---

### ⚡ Nginx Caching (HTTP Level)

* Caches full API response:

  ```
  GET /products
  ```
* Serves response without hitting backend
* Header-based cache verification:

  ```
  X-Cache-Status: HIT / MISS
  ```

---

## 📂 Project Structure

```
backend/
 ├── src/
 │   ├── controllers/
 │   ├── models/
 │   ├── routes/
 │   ├── config/
 │   └── app.ts
 │
nginx/
 └── nginx.conf
```

---

## 🚀 Getting Started

### 1. Clone Repository

```bash
git clone https://github.com/Bhushan5858/redis-nginx-express-mongodb.git
cd redis-nginx-express-mongodb
```

---

### 2. Install Backend Dependencies

```bash
npm install
```

---

### 3. Setup Environment

Create `.env` file:

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/ecommerce
```

---

### 4. 🐳 Run Redis (Docker)

```bash
docker run -d -p 6379:6379 --name redis-server redis:7
```

---

### 5. 🐳 Run Nginx (Docker)

```bash
docker run -d -p 80:80 \
-v "<FULL_PATH_TO_nginx.conf>:/etc/nginx/nginx.conf" \
--name nginx-server nginx
```

---
### 6.  Run Backend

```bash
npm run dev
```

---

## 🔍 Testing

### Access via Nginx

```
http://localhost/products
```

---

### Check Cache

* First request:

  ```
  X-Cache-Status: MISS
  ```
* Second request:

  ```
  X-Cache-Status: HIT
  ```

---

## 🧠 Caching Strategy

| Layer | Purpose                         |
| ----- | ------------------------------- |
| Nginx | Fast HTTP caching (public data) |
| Redis | Smart caching (dynamic data)    |

---

## ⚠️ Important Notes

* Nginx cache is stored on disk
* Redis cache is stored in memory
* Cache invalidation handled via Redis
* Nginx cache uses TTL (no direct invalidation)

---

## 📈 Future Improvements

* Load balancing with multiple backend instances
* Authentication & authorization
* Rate limiting with Redis
* CI/CD pipeline

---

## 👨‍💻 Author

Bhushan

---

## 📄 License

This project is for learning purposes.
