# Database Guide

This document describes the NeighborFit backend database models, relationships, and seeding process.

---

## Database Used
- **MongoDB** (local or cloud, e.g., MongoDB Atlas)
- Managed via **Mongoose** ODM

---

## Models

### User
- `username` (string, unique, required)
- `email` (string, unique, required)
- `passwordHash` (string, required, hashed with bcryptjs)

### Neighborhood
- `id` (string, unique)
- `name` (string)
- `city` (string)
- `state` (string)
- `coordinates` (object: `{ lat, lng }`)
- `demographics` (object: population, medianAge, etc.)
- `housing` (object: medianPrice, rentPrice, types, etc.)
- `amenities` (object: walkScore, transitScore, etc.)
- `safety` (object: crimeRate, safetyScore)
- `quality` (object: airQuality, noiseLevel, greenSpace)

---

## Relationships
- There are currently no foreign key relationships; each user and neighborhood is independent.
- (Planned) User preferences and saved assessments will reference user IDs.

---

## How the Backend Connects to the DB
- The backend connects to MongoDB using the `MONGODB_URI` from `.env`.
- Mongoose models are defined in `backend/src/types.ts`.
- All API endpoints use these models for CRUD operations.

---

## Sample Data
Neighborhoods are seeded from `backend/seed/neighborhoods.json`. Example:
```json
[
  {
    "id": "hsr-layout",
    "name": "HSR Layout",
    "city": "Bangalore",
    "state": "Karnataka",
    "coordinates": { "lat": 12.9116, "lng": 77.6412 },
    "demographics": { ... },
    "housing": { ... },
    "amenities": { ... },
    "safety": { ... },
    "quality": { ... }
  },
  ...
]
```

---

## Seeding the Database
To load sample neighborhoods:
```bash
cd backend
node seedNeighborhoods.js
```
This will import all neighborhoods from `backend/seed/neighborhoods.json` into your MongoDB database.

---

## Notes
- You can add or edit neighborhoods in the JSON file and re-run the seed script.
- For production, use a secure, cloud-hosted MongoDB instance (e.g., Atlas). 