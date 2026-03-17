# Node Authentication API

Secure authentication API built with Node.js, Express, MongoDB, JWT access tokens, refresh token rotation, and role-based authorization.

This is an ongoing project, and the implementation may continue to evolve as I improve security, validation, testing, and overall backend architecture.

## Overview

This project is a backend authentication system built to demonstrate practical auth and authorization patterns in a clean Express application.

It includes:

- user registration with hashed passwords
- login with JWT access tokens
- refresh token rotation using `httpOnly` cookies
- refresh token reuse detection
- role-based authorization for protected routes
- MongoDB persistence with Mongoose
- centralized logging and error handling

## Highlights

This API showcases backend security concepts that are commonly used in real-world Node.js applications:

- short-lived access tokens
- rotating refresh tokens
- cookie-based session continuation
- protected routes with JWT verification
- role-based access control for admin/editor/user permissions

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (`jsonwebtoken`)
- bcrypt
- cookie-parser
- cors
- dotenv

## Features

- Register new users
- Authenticate existing users
- Generate access and refresh tokens
- Rotate refresh tokens securely
- Revoke refresh tokens on logout
- Protect API routes with JWT middleware
- Restrict routes by role
- Manage users and employees through protected endpoints

## API Endpoints

| Method   | Endpoint             | Description                                 |
| -------- | -------------------- | ------------------------------------------- |
| `POST`   | `/register`          | Register a new user                         |
| `POST`   | `/auth`              | Login and receive an access token           |
| `POST`   | `/refresh`           | Get a new access token using refresh cookie |
| `POST`   | `/logout`            | Logout and invalidate refresh token         |
| `GET`    | `/api/users`         | Get all users (Admin only)                  |
| `GET`    | `/api/users/:id`     | Get one user (Admin only)                   |
| `DELETE` | `/api/users/:id`     | Delete one user (Admin only)                |
| `GET`    | `/api/employees`     | Get all employees (Authenticated users)     |
| `POST`   | `/api/employees`     | Create employee (Admin or Editor)           |
| `GET`    | `/api/employees/:id` | Get one employee (Authenticated users)      |
| `PUT`    | `/api/employees/:id` | Update employee (Admin or Editor)           |
| `DELETE` | `/api/employees/:id` | Delete employee (Admin only)                |

## Auth Flow

1. A user registers with username and password.
2. The password is hashed with `bcrypt` before being stored.
3. On login, the API returns a short-lived JWT access token.
4. A refresh token is stored in an `httpOnly` cookie.
5. The refresh endpoint rotates the refresh token and issues a new access token.
6. Protected routes require a valid bearer token.
7. Role middleware checks whether the authenticated user can access specific actions.

## Local Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Create a `.env` File

```env
PORT=3500
DATABASE_URI=your_mongodb_connection_string
ACCESS_TOKEN_SECRET=your_access_token_secret
REFRESH_TOKEN_SECRET=your_refresh_token_secret
```

### 3. Start the Server

```bash
npm run dev
```

## Example Request

```bash
curl -X POST http://localhost:3500/auth \
  -H "Content-Type: application/json" \
  -d "{\"user\":\"alice\",\"password\":\"secret123\"}"
```

## Folder Structure

```text
config/
controllers/
middleware/
models/
routes/
public/
views/
server.js
```

## Notes

- The login and registration payload uses `user` as the username field.
- Usernames are normalized to lowercase before storage.
- Passwords must be at least 8 characters and include uppercase, lowercase, number, and special character.
- Passwords are hashed before saving to the database.
- Access tokens are used for protected routes.
- Refresh tokens are stored in the database and rotated on refresh.

## Future Improvements

- Add automated tests
- Add rate limiting
- Add account verification and password reset flows
- Improve production cookie security configuration

## Author

Srinivas KR  
GitHub: [Srinivas-KR-Dev](https://github.com/Srinivas-KR-Dev)
