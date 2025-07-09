# NeighborFit - Bangalore Neighborhood Finder

A full-stack web application to help users find their perfect neighborhood in Bangalore based on lifestyle, housing, and personal priorities.

---

## Features
- Interactive assessment and smart matching
- User authentication (signup/login with JWT)
- Backend API with filtering and error handling
- Modern UI with light/dark mode (theme switcher)
- Responsive design for all devices

---

## Technology Stack
- **Frontend**: React 18, TypeScript, Tailwind CSS, Vite
- **Backend**: Node.js, Express, MongoDB, Mongoose, JWT

---

## Getting Started

### Prerequisites
- Node.js (16+)
- MongoDB (local or Atlas)

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/neighborfit-bangalore.git
   cd neighborfit-bangalore
   ```
2. Install dependencies for both frontend and backend:
   ```bash
   cd frontend && npm install
   cd ../backend && npm install
   ```
3. Set up environment variables for the backend:
   - Create a `.env` file in `backend/`:
     ```env
     PORT=4000
     MONGODB_URI=mongodb://localhost:27017/neighborfit
     JWT_SECRET=your_jwt_secret
     ```
4. (Optional) Seed the database with sample data:
   ```bash
   cd backend
   node seedNeighborhoods.js
   ```

### Running the App
- **Start the backend:**
  ```bash
  cd backend
  npm run dev
  # or npm run start
  ```
- **Start the frontend:**
  ```bash
  cd frontend
  npm run dev
  ```
- Open your browser at `http://localhost:5173`

---

## Authentication Flow
- **Signup:** Users register with username, email, and password (hashed, validated backend-side)
- **Login:** Users log in with username/email and password, receive a JWT token
- **JWT:** Used for authenticated requests (stored in localStorage)
- **Error Handling:** All errors returned as JSON, shown in the UI

---

## Dark Mode
- Toggle between light and dark themes using the theme switcher in the UI
- All major pages and components are styled for both modes

---

## API & Backend
- See [API.md](API.md) for full backend API documentation
- See [ARCHITECTURE.md](ARCHITECTURE.md) for project structure and backend details

---

## Database Seeding
- Sample neighborhoods are loaded from `backend/seed/neighborhoods.json`
- Run `node seedNeighborhoods.js` in the backend to seed the database

---

## Deployment
- See [DEPLOYMENT.md](DEPLOYMENT.md) for instructions on deploying both frontend and backend

---

## License
MIT