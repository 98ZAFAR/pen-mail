# PenMail Backend

This is the backend service for the PenMail website. It provides RESTful APIs for user authentication, email management, and other core features.

## Folder Structure

```
backend/
├── controllers/      # Route handlers and business logic
├── models/           # Database models/schemas
├── routes/           # API route definitions
├── middlewares/       # Custom middleware (auth, error handling, etc.)
├── utils/            # Utility functions and helpers
├── configs/          # Configuration files (DB, environment)
├── services/         # Services (like emails etc.)
└── server.js         # Entry point to start the server
```

## Basic Routes

| Method | Endpoint           | Description                  |
|--------|--------------------|------------------------------|
| POST   | `/api/auth/register` | Register a new user         |
| POST   | `/api/auth/login`    | User login                  |
| GET    | `/api/emails`        | Get all emails for user     |
| POST   | `/api/emails`        | Send a new email            |
| GET    | `/api/emails/:id`    | Get a specific email        |
| DELETE | `/api/emails/:id`    | Delete an email             |

## Getting Started

1. Clone the repository.
2. Install dependencies: `npm install`
3. Set up environment variables in `.env`.
4. Start the server: `npm start`

---

Feel free to contribute or open issues for improvements!