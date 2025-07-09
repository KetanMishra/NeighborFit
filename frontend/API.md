# NeighborFit API Documentation

## Overview

NeighborFit provides a RESTful backend API for authentication, user management, and neighborhood search/filtering. All endpoints return JSON. Authentication uses JWT tokens.

---

## Authentication Endpoints

### Signup
- **POST** `/api/auth/signup`
- **Body:**
  ```json
  {
    "username": "string", // required, unique
    "email": "string",    // required, unique
    "password": "string"  // required
  }
  ```
- **Success Response:**
  - `201 Created`
  ```json
  { "message": "User created" }
  ```
- **Error Responses:**
  - `400 Bad Request` (missing fields)
  - `409 Conflict` (username/email exists)
  - All errors: `{ "message": "..." }`

### Login
- **POST** `/api/auth/login`
- **Body:**
  ```json
  {
    "identifier": "string", // username or email
    "password": "string"
  }
  ```
- **Success Response:**
  - `200 OK`
  ```json
  {
    "token": "jwt-token-string",
    "username": "string",
    "email": "string"
  }
  ```
- **Error Responses:**
  - `400 Bad Request` (missing fields)
  - `401 Unauthorized` (invalid credentials)
  - All errors: `{ "message": "..." }`

---

## Neighborhoods Endpoints

### List/Search Neighborhoods
- **GET** `/api/neighborhoods`
- **Query Parameters (all optional):**
  - `minRent`, `maxRent` (number)
  - `minWalkScore`, `minTransitScore`, `minSafetyScore` (number)
- **Example:** `/api/neighborhoods?minRent=20000&maxRent=50000&minWalkScore=70`
- **Success Response:**
  - `200 OK`
  ```json
  [
    {
      "id": "hsr-layout",
      "name": "HSR Layout",
      "city": "Bangalore",
      ...
    },
    ...
  ]
  ```
- **Error Responses:**
  - `500 Internal Server Error` (DB or server issues)

---

## Error Format
All errors are returned as JSON:
```json
{ "message": "Human readable error message" }
```

---

## Security & Validation
- All input is validated server-side (required fields, unique username/email, password hash)
- JWT tokens are used for authentication (returned on login)
- All endpoints return JSON only
- Global error handler ensures consistent error responses

---

## Example Usage

### Signup
```bash
curl -X POST http://localhost:4000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"username":"alice","email":"alice@example.com","password":"secret"}'
```

### Login
```bash
curl -X POST http://localhost:4000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"identifier":"alice","password":"secret"}'
```

### Filter Neighborhoods
```bash
curl "http://localhost:4000/api/neighborhoods?minRent=20000&minWalkScore=70"
```

---

## Future Endpoints (Planned)
- User preferences (save/load)
- Match calculation
- Real estate integration

---

## Contact & Support
- For API issues, open a GitHub issue or email api-support@neighborfit.com