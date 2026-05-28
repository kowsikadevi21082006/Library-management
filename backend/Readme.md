# Library Management System API

## Project Overview

This project is a Library Management System built using Node.js, Express.js, PostgreSQL, and Prisma ORM.

The application provides RESTful APIs for managing:

* Members
* Books
* Book Issuance

The APIs are secured using API Key authentication.

---

## Tech Stack

* Node.js
* Express.js
* PostgreSQL
* Prisma ORM
* Supabase
* Postman

---

## Features

### Member APIs

* Create Member
* Get All Members
* Get Member By ID
* Update Member

### Book APIs

* Create Book
* Get All Books
* Get Book By ID
* Update Book

### Issuance APIs

* Issue Book
* Get All Issued Books
* Update Return Status

---

## API Security

All APIs are protected using API Key authentication.

### Header

x-api-key: mysecretkey

---

## API Endpoints

### Member Routes

POST /member

GET /member

GET /member/:id

PUT /member/:id

---

### Book Routes

POST /book

GET /book

GET /book/:id

PUT /book/:id

---

### Issuance Routes

POST /issuance

GET /issuance

PUT /issuance/:id

---

## Installation

### Clone Repository

git clone <repository_url>

### Install Dependencies

npm install

### Run Server

npm run dev

---

## Database

Database is hosted using Supabase PostgreSQL.

---

## SQL Queries

The project includes SQL queries for:

1. Books never borrowed
2. Outstanding books
3. Top 10 most borrowed books

Queries are available in:

queries.sql

---

## Author

Kowsika
