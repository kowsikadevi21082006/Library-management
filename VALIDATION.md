# Assignment Validation Document

## Project Name

Library Management System

## Objective

The objective of this assignment was to build and validate a full-stack Library Management System with the following requirements:

* Database design
* RESTful APIs
* API security
* SQL query implementation
* Frontend dashboard
* Full-stack integration

The application was implemented using React.js, Node.js, Express.js, Prisma ORM, PostgreSQL, and Supabase.

## Deployed Application Links

Frontend:

```txt
https://library-management-7x2f.vercel.app/
```

Backend:

```txt
https://library-management-2-bfke.onrender.com
```

## Environment Details

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
* API key authentication

### Database

* PostgreSQL
* Supabase

### Testing Tools

* Postman
* Supabase SQL Editor
* Browser-based frontend testing

## Screenshot Note

Screenshots are not included inside this validation file. The required screenshots are added separately in the project documentation file.

## Validation Summary

| Module | Validation Status |
| --- | --- |
| Database hosting | Completed |
| Prisma database connection | Completed |
| Member APIs | Completed |
| Book APIs | Completed |
| Issuance APIs | Completed |
| API key security | Completed |
| SQL queries | Completed |
| Frontend dashboard | Completed |
| Frontend and backend integration | Completed |

## 1. Database Validation

The PostgreSQL database was created and hosted successfully on Supabase.

Validated database tables:

* Member
* Book
* Issuance

Validation result:

* Tables were created successfully.
* Prisma ORM was connected to the PostgreSQL database.
* Data was inserted, retrieved, and updated successfully through backend APIs.

## 2. Member API Validation

### Create Member

API endpoint:

```txt
POST /member
```

Validation method:

* Tested using Postman.
* Sent member details in the request body.
* Included the required API key header.

Result:

* Member record was created successfully.
* Created member data was stored in the PostgreSQL database.

### Get Members

API endpoint:

```txt
GET /member
```

Validation method:

* Tested using Postman and frontend Members page.

Result:

* All member records were retrieved successfully.
* Member list was displayed correctly in the frontend.

## 3. Book API Validation

### Create Book

API endpoint:

```txt
POST /book
```

Validation method:

* Tested using Postman.
* Sent book name, author, and available count in the request body.
* Included the required API key header.

Result:

* Book record was created successfully.
* Created book data was stored in the PostgreSQL database.

### Get Books

API endpoint:

```txt
GET /book
```

Validation method:

* Tested using Postman and frontend Books page.

Result:

* All book records were retrieved successfully.
* Book list was displayed correctly in the frontend.

## 4. Issuance API Validation

### Issue Book

API endpoint:

```txt
POST /issuance
```

Validation method:

* Tested using Postman and frontend Issuance page.
* Selected member and book records.
* Sent issued date and target return date.
* Included the required API key header.

Result:

* Issuance record was created successfully.
* Issuance data was stored in the PostgreSQL database.
* Member and book details were displayed correctly in the issuance table.

### Update Return Status

API endpoint:

```txt
PUT /issuance/:id
```

Validation method:

* Tested using Postman and frontend Issuance page.
* Updated the return status of an issued book.

Result:

* Book return status was updated successfully.
* Pending return count was updated correctly in the frontend dashboard.

## 5. API Security Validation

The backend APIs are protected using API key authentication.

Required header:

```txt
x-api-key: mysecretkey
```

Validation method:

* Sent requests with the valid API key.
* Sent requests without the API key.
* Sent requests with an invalid API key.

Result:

* Requests with the valid API key were accepted.
* Requests without the API key were rejected.
* Requests with an invalid API key were rejected.

## 6. SQL Query Validation

The required SQL queries were implemented and tested using the Supabase SQL Editor.

### Query 1: Books Never Borrowed

Purpose:

* To list books that do not have any issuance records.

Result:

* The query successfully returned books that were never borrowed.

### Query 2: Outstanding Books

Purpose:

* To list books that are issued but not yet returned.

Result:

* The query successfully returned all pending return records.

### Query 3: Top 10 Most Borrowed Books

Purpose:

* To list the most borrowed books based on issuance count.

Result:

* The query successfully returned the top borrowed books in descending order of borrow count.

## 7. Frontend Validation

Frontend validation was performed using the deployed React application.

### Dashboard Page

Validated items:

* Total members
* Total books
* Total issuances
* Pending returns

Result:

* Dashboard values were fetched from the backend and displayed correctly.

### Members Page

Validated items:

* Add member form
* Member list display
* Form validation
* Success and error messages

Result:

* New members were added successfully.
* The members list refreshed immediately after creation.

### Books Page

Validated items:

* Add book form
* Book list display
* Form validation
* Success and error messages

Result:

* New books were added successfully.
* The books list refreshed immediately after creation.

### Issuance Page

Validated items:

* Members dropdown
* Books dropdown
* Create issuance form
* Issuance table
* Mark returned functionality
* Success and error messages

Result:

* Issuance records were created successfully.
* Member names and book names were displayed correctly.
* Return status was updated successfully.
* The UI refreshed immediately after create and update operations.

## 8. Full-Stack Integration Validation

The frontend was connected to the deployed backend API.

Validation flow:

1. User submits data from the React frontend.
2. Axios sends the request to the deployed Express backend.
3. API key authentication validates the request.
4. Prisma ORM stores or retrieves data from Supabase PostgreSQL.
5. The frontend updates the UI with the latest backend data.

Result:

* Frontend, backend, and database integration was completed successfully.
* Create and update operations were persisted in PostgreSQL.
* Updated data was reflected immediately in the frontend.

## Conclusion

The Library Management System was successfully implemented and validated.

The application satisfies the assignment requirements:

* Database hosting
* Database design
* CRUD REST APIs
* API key security
* SQL query implementation
* Frontend dashboard
* Full-stack frontend-backend-database integration

All modules were tested successfully using Postman, Supabase SQL Editor, and the deployed React frontend.
