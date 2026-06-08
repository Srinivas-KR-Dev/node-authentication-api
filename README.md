# Node Authentication API

Secure authentication API built with Node.js, Express, MongoDB, JWT access tokens, refresh token rotation, and role-based authorization.

This is an ongoing project, and the implementation may continue to evolve as I improve security, validation, testing, and overall backend architecture.

## Overview

This project is a simple backend authentication system built to practice real-world auth concepts in Node.js and Express.

It includes:

- user registration with hashed passwords
- login with JWT access tokens
- refresh token rotation using `httpOnly` cookies
- role-based authorization for protected routes
- MongoDB persistence with Mongoose
- default employee seed data for quick testing
- a simple React frontend running on a different port to showcase the backend flow

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
- Demo frontend with registration, login, auth context, and employee list

## User Model

Each user includes:

- `username`
- `fullname`
- `email`
- `roles`
- `password`
- `refreshToken`

## Employee Model

Each employee includes:

- `firstname`
- `lastname`
- `email`
- `phone`
- `department`
- `job`

## API Endpoints

| Method | Endpoint | Description |
| --- | --- | --- |
| `POST` | `/register` | Register a new user |
| `POST` | `/auth` | Login and receive an access token |
| `POST` | `/refresh` | Get a new access token using refresh cookie |
| `POST` | `/logout` | Logout and invalidate refresh token |
| `GET` | `/api/users` | Get all users (Admin only) |
| `GET` | `/api/users/:id` | Get one user (Admin only) |
| `DELETE` | `/api/users/:id` | Delete one user (Admin only) |
| `GET` | `/api/employees` | Get all employees (Authenticated users) |
| `POST` | `/api/employees` | Create employee (Admin or Editor) |
| `GET` | `/api/employees/:id` | Get one employee (Authenticated users) |
| `PUT` | `/api/employees/:id` | Update employee (Admin or Editor) |
| `DELETE` | `/api/employees/:id` | Delete employee (Admin only) |

## Auth Flow

1. A user registers with username, fullname, email, and password.
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

When the database connects, default employee data will be added automatically if the employees collection is empty.

## Frontend Demo Setup

The frontend app now lives outside this backend folder as a sibling project:

`C:\Users\07krs\Documents\Full Stack\Nodejs\client`

### 1. Install frontend dependencies

```bash
cd ..
cd client
npm install
```

### 2. Start the frontend

```bash
npm run dev
```

The frontend runs on `http://localhost:5173` and connects to the backend on `http://localhost:3500`.

### Demo Flow

1. Open the frontend in the browser.
2. Register a new user.
3. After successful registration, review the user details page.
4. Go to login and authenticate.
5. After login, view the protected employee list page.

## Example Requests

Register:

```bash
curl -X POST http://localhost:3500/register \
  -H "Content-Type: application/json" \
  -d "{\"user\":\"alice\",\"fullname\":\"Alice Johnson\",\"email\":\"alice@example.com\",\"password\":\"SecurePass@123\"}"
```

Login:

```bash
curl -X POST http://localhost:3500/auth \
  -H "Content-Type: application/json" \
  -d "{\"user\":\"alice\",\"password\":\"SecurePass@123\"}"
```

Create employee:

```bash
curl -X POST http://localhost:3500/api/employees \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <access_token>" \
  -d "{\"firstname\":\"Ravi\",\"lastname\":\"Kumar\",\"email\":\"ravi.kumar@company.com\",\"phone\":\"9876543200\",\"department\":\"Support\",\"job\":\"Support Engineer\"}"
```

## Notes

- The login and registration payload uses `user` as the username field.
- Registration requires `fullname` and `email`.
- Usernames are normalized to lowercase before storage.
- User and employee emails are stored in lowercase.
- Employee phone numbers must be 10 digits.
- Passwords must be at least 8 characters and include uppercase, lowercase, number, and special character.
- Refresh tokens are stored in the database and rotated on refresh.

## Future Improvements

- Add automated tests
- Add rate limiting
- Add account verification and password reset flows
- Improve production cookie security configuration

## Author

Srinivas KR  
GitHub: [Srinivas-KR-Dev](https://github.com/Srinivas-KR-Dev)
