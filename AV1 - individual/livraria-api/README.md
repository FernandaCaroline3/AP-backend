# Library API

## Overview
This project is a simple REST API for managing a library of books. It includes basic authentication and differentiates between regular users and administrators. The API is built using Node.js, Express, and Prisma ORM with SQLite as the database.

## Features
- User authentication (login and registration)
- Role-based access control (regular users and administrators)
- CRUD operations for managing books
- Basic Token authentication

## Project Structure
```
library-api
├── src
│   ├── app.js
│   ├── controllers
│   │   ├── authController.js
│   │   └── bookController.js
│   ├── routes
│   │   ├── authRoutes.js
│   │   └── bookRoutes.js
│   ├── middleware
│   │   ├── authMiddleware.js
│   │   └── roleMiddleware.js
│   ├── prisma
│   │   └── client.js
│   └── models
│       └── index.js
├── prisma
│   ├── schema.prisma
│   └── migrations
├── package.json
├── README.md
└── .env
```

## Setup Instructions
1. Clone the repository:
   ```
   git clone <repository-url>
   cd library-api
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up the database:
   - Configure your `.env` file with the necessary environment variables.
   - Run the Prisma migrations:
   ```
   npx prisma migrate dev --name init
   ```

4. Start the application:
   ```
   npm start
   ```

## API Usage
- **Authentication**
  - POST `/api/auth/register`: Register a new user.
  - POST `/api/auth/login`: Log in an existing user.

- **Books Management**
  - GET `/api/books`: Retrieve all books.
  - POST `/api/books`: Create a new book (admin only).
  - PUT `/api/books/:id`: Update a book (admin only).
  - DELETE `/api/books/:id`: Delete a book (admin only).

## License
This project is licensed under the ISC License.