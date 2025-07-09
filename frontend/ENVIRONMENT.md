# Environment Variables Guide

This document explains the environment variables used in the NeighborFit backend. Do **not** commit your actual secrets or credentials to version control.

---

## Required Variables (backend/.env)

- `PORT` — The port the backend server will listen on (default: 4000)
- `MONGODB_URI` — MongoDB connection string (e.g., `mongodb://localhost:27017/neighborfit` or your MongoDB Atlas URI)
- `JWT_SECRET` — Secret key for signing JWT tokens (choose a strong, random value)

---

## Example .env File
```
PORT=4000
MONGODB_URI=mongodb://localhost:27017/neighborfit
JWT_SECRET=your_jwt_secret
```

---

## Notes
- Never share your real JWT secret or database credentials publicly.
- If deploying to cloud (Render, Railway, etc.), set these variables in the provider's dashboard.
- The frontend does **not** require any .env variables for basic operation. 