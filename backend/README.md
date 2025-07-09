# NeighborFit Backend

## Setup

1. Install dependencies:
   ```sh
   npm install
   ```
2. Create a `.env` file (see `.env.example`):
   ```env
   PORT=4000
   JWT_SECRET=supersecretkey
   ```

## Development

Start the backend in development mode (with auto-reload):
```sh
npm run dev
```

## Production

Start the backend in production mode:
```sh
npm run start
```

## API Endpoints

- `POST /api/auth/signup` — Create a new user
- `POST /api/auth/login` — Login and get JWT
- `GET /api/neighborhoods` — List neighborhoods 