# Library Management System

A full-stack Library Management System built using React.js, Node.js, Express.js, PostgreSQL, and Prisma ORM.

The application allows users to manage:

* Members
* Books
* Book Issuance
* Pending Returns

---

# Tech Stack

## Frontend

* React.js
* Vite
* Tailwind CSS
* Axios
* React Router DOM

## Backend

* Node.js
* Express.js
* Prisma ORM
* PostgreSQL
* Supabase

---

# Features

## Member Management

* Add Members
* View Members
* Update Members

## Book Management

* Add Books
* View Books
* Update Books

## Book Issuance

* Issue Books
* View Issued Books
* Mark Books as Returned

## Dashboard

* Total Members
* Total Books
* Total Issued Books
* Pending Returns

---

# API Security

All APIs are protected using API Key authentication.

## Required Header

```txt
x-api-key: mysecretkey
```

---

# API Endpoints

## Member APIs

```txt
POST   /member
GET    /member
GET    /member/:id
PUT    /member/:id
```

---

## Book APIs

```txt
POST   /book
GET    /book
GET    /book/:id
PUT    /book/:id
```

---

## Issuance APIs

```txt
POST   /issuance
GET    /issuance
PUT    /issuance/:id
```

---

# Project Structure

```txt
library-management/
│
├── backend/
│
├── frontend/
│
└── README.md
```

---

# Backend Setup

```bash
cd backend

npm install

npm run dev
```

Backend runs on:

```txt
http://localhost:5000
```

---

# Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Frontend runs on:

```txt
http://localhost:5173
```

---

# Database

PostgreSQL database hosted using Supabase.

---

# SQL Queries

The project includes SQL queries for:

1. Books never borrowed
2. Outstanding books
3. Top 10 most borrowed books

Queries are available in:

```txt
queries.sql
```

---

# Sample Features Implemented

* CRUD REST APIs
* Database Hosting
* Prisma ORM Integration
* API Key Authentication
* Responsive Frontend UI
* Dashboard for Pending Returns
* SQL Query Implementation

---

# Author

Kowsika
