# Architecture Documentation

## System Overview

NeighborFit is a full-stack web application with a React + TypeScript frontend and a Node.js/Express + MongoDB backend. The frontend provides a modern, themeable UI and interacts with the backend via RESTful API endpoints for authentication and neighborhood data.

---

## Project Structure

```
project-root/
├── frontend/           # React app (Vite, Tailwind, TypeScript)
│   └── src/
│       ├── components/     # UI components (assessment, results, modals, etc.)
│       ├── data/           # Static data (if used)
│       ├── types/          # TypeScript types
│       ├── utils/          # Utility functions
│       └── App.tsx         # Main app entry
├── backend/            # Node.js/Express API
│   ├── src/
│   │   ├── index.ts        # Server entrypoint
│   │   ├── auth.ts         # Auth routes (signup, login)
│   │   ├── neighborhoods.ts# Neighborhood API routes
│   │   ├── types.ts        # Mongoose schemas (User, Neighborhood)
│   │   └── utils/
│   │       └── asyncHandler.ts # Async error handler
│   ├── seed/           # Seed data (neighborhoods.json)
│   └── seedNeighborhoods.js # DB seeding script
└── ...
```

---

## Backend Architecture

- **Express.js** server with modular routers for `/api/auth` and `/api/neighborhoods`
- **MongoDB** for persistent storage (users, neighborhoods)
- **Mongoose** for schema modeling
- **JWT** for stateless authentication
- **bcryptjs** for password hashing
- **dotenv** for environment variable management
- **Global error handler** for consistent JSON error responses

### Service Layers
- **Routes**: Handle HTTP requests, validate input, call DB
- **Models**: Mongoose schemas for User and Neighborhood
- **Utils**: `asyncHandler` for wrapping async route handlers

### API Flow Example
1. **Signup**: `POST /api/auth/signup` → Validate input → Hash password → Save user → Respond
2. **Login**: `POST /api/auth/login` → Find user by username/email → Compare password → Issue JWT
3. **Neighborhoods**: `GET /api/neighborhoods` → Parse filters → Query MongoDB → Return results

---

## Database Schema

### User
```ts
{
  username: string, // unique
  email: string,    // unique
  passwordHash: string
}
```

### Neighborhood
```ts
{
  id: string,
  name: string,
  city: string,
  state: string,
  coordinates: { lat: number, lng: number },
  demographics: { ... },
  housing: { ... },
  amenities: { ... },
  safety: { ... },
  quality: { ... }
}
```

---

## Error Handling
- All errors are returned as JSON: `{ "message": "..." }`
- 404 handler for unmatched routes
- Global error handler for uncaught exceptions
- Input validation for required fields and uniqueness

---

## Authentication Flow
1. **Signup**: User submits username, email, password → Backend validates and creates user
2. **Login**: User submits identifier (username/email) and password → Backend verifies and returns JWT
3. **JWT**: Sent in response, stored client-side (e.g., localStorage)
4. **Protected routes**: (Planned) Require JWT in Authorization header

---

## Frontend-Backend Interaction
- **Signup/Login**: Frontend sends POST requests to backend, handles JWT and errors
- **Neighborhood Search**: Frontend sends GET requests with filters as query params
- **Error Handling**: Frontend displays error messages from backend JSON
- **Theme/Mode**: Frontend supports light/dark mode (Tailwind), independent of backend

---

## Example Request/Response

### Signup
Request:
```json
{
  "username": "alice",
  "email": "alice@example.com",
  "password": "secret"
}
```
Response:
```json
{ "message": "User created" }
```

### Login
Request:
```json
{
  "identifier": "alice",
  "password": "secret"
}
```
Response:
```json
{
  "token": "jwt-token-string",
  "username": "alice",
  "email": "alice@example.com"
}
```

### Neighborhoods
Request:
`GET /api/neighborhoods?minRent=20000&minWalkScore=70`
Response:
```json
[
  {
    "id": "hsr-layout",
    "name": "HSR Layout",
    ...
  },
  ...
]
```

---

## Security
- Passwords are hashed with bcryptjs
- JWT tokens for authentication
- All input validated server-side
- Consistent error responses

---

## Future Enhancements
- User preferences and saved assessments
- More granular filtering and search
- Admin endpoints for managing data
- Rate limiting and advanced security
- Real estate and transit API integrations

---

## Contact
For architecture questions, open a GitHub issue or email the project maintainers.