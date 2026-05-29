# Library Management System

A full-stack Library Management System built with React.js, Node.js, Express.js, Prisma ORM, and PostgreSQL. The application helps manage library members, books, book issuance records, and pending returns through a responsive frontend connected to a deployed backend API.

## Deployed Links

Frontend:

```txt
https://library-management-7x2f.vercel.app/
```

Backend:

```txt
https://library-management-2-bfke.onrender.com
```

## Tech Stack

### Frontend

* React.js
* Vite
* Tailwind CSS
* Axios
* React Router DOM

### Backend

* Node.js
* Express.js
* Prisma ORM
* PostgreSQL
* Supabase
* Render

## Features

### Dashboard

* View total members
* View total books
* View total issuance records
* View pending returns

### Member Management

* Add members
* View all members
* Update member details through API

### Book Management

* Add books
* View all books
* Update book details through API

### Book Issuance

* Issue books to members
* View issued book records
* Display member and book names
* Mark books as returned
* Track pending returns

## API Security

All backend API routes are protected using API key authentication.

Required request header:

```txt
x-api-key: mysecretkey
```

## API Endpoints

Base backend URL:

```txt
https://library-management-2-bfke.onrender.com
```

### Member APIs

```txt
POST   /member
GET    /member
GET    /member/:id
PUT    /member/:id
```

### Book APIs

```txt
POST   /book
GET    /book
GET    /book/:id
PUT    /book/:id
```

### Issuance APIs

```txt
POST   /issuance
GET    /issuance
PUT    /issuance/:id
```

## Project Structure

```txt
Library-management/
|
|-- backend/
|   |-- prisma/
|   |   `-- schema.prisma
|   |-- src/
|   |   |-- middleware/
|   |   |-- prisma/
|   |   |-- routes/
|   |   `-- app.js
|   |-- queries.sql
|   `-- package.json
|
|-- frontend/
|   |-- public/
|   |-- src/
|   |   |-- components/
|   |   |-- layouts/
|   |   |-- pages/
|   |   |-- routes/
|   |   |-- services/
|   |   `-- main.jsx
|   `-- package.json
|
`-- README.md
```

## Backend Setup

Go to the backend folder:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file inside the `backend` folder and add your database URL:

```env
DATABASE_URL="your_postgresql_connection_string"
API_KEY="mysecretkey"
```

Generate Prisma client:

```bash
npx prisma generate
```

Run the backend locally:

```bash
npm run dev
```

Local backend URL:

```txt
http://localhost:5000
```

## Frontend Setup

Go to the frontend folder:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Run the frontend locally:

```bash
npm run dev
```

Local frontend URL:

```txt
http://localhost:5173
```

## Database

The application uses PostgreSQL hosted on Supabase. Prisma ORM is used to define the database schema and communicate with the database.

Main database models:

* Member
* Book
* Issuance

## SQL Queries

The project includes SQL queries for:

1. Books never borrowed
2. Outstanding books
3. Top 10 most borrowed books

The queries are available in:

```txt
backend/queries.sql
```

## Deployment

### Backend Deployment

The backend is deployed on Render:

```txt
https://library-management-2-bfke.onrender.com
```

Render environment variables must include:

```env
DATABASE_URL="your_supabase_postgresql_connection_string"
API_KEY="mysecretkey"
```

### Frontend Deployment

The frontend is deployed on Vercel:

```txt
https://library-management-7x2f.vercel.app/
```

The frontend uses Axios to call the deployed Render backend with the required API key header.

## How The App Works

1. The user interacts with the React frontend.
2. Axios sends requests to the deployed Express backend.
3. The backend validates the API key.
4. Express routes call Prisma ORM.
5. Prisma reads/writes data in the Supabase PostgreSQL database.
6. The frontend refreshes data and displays the updated UI.

## Author

Kowsika
