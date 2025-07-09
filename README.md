# NeighborFit – Bangalore Neighborhood Finder

NeighborFit is a full-stack web application that helps you find the best neighborhood in Bangalore based on your lifestyle, housing needs, and personal priorities. It features a modern React frontend, a robust Node.js/Express backend, and a MongoDB database.

---

## 🚀 Features
- **Interactive Assessment**: Multi-step questionnaire to capture your preferences
- **Smart Matching**: Weighted scoring system for personalized recommendations
- **User Authentication**: Secure signup/login with JWT
- **Backend API**: Filter neighborhoods by rent, walk score, safety, and more
- **Dark Mode**: Seamless light/dark theme switcher
- **Responsive UI**: Works great on desktop, tablet, and mobile

---

## 🛠️ Technology Stack
- **Frontend**: React 18, TypeScript, Tailwind CSS, Vite
- **Backend**: Node.js, Express, MongoDB, Mongoose, JWT

---

## ⚡ Getting Started

### Prerequisites
- Node.js (16+)
- MongoDB (local or Atlas)

### Installation & Setup
1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/neighborfit-bangalore.git
   cd neighborfit-bangalore
   ```
2. **Install dependencies:**
   ```bash
   cd frontend && npm install
   cd ../backend && npm install
   ```
3. **Set up backend environment variables:**
   - Create a `.env` file in `backend/`:
     ```env
     PORT=4000
     MONGODB_URI=mongodb://localhost:27017/neighborfit
     JWT_SECRET=your_jwt_secret
     ```
4. **(Optional) Seed the database:**
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
- Open your browser at [http://localhost:5173](http://localhost:5173)

---

## 🔐 Authentication Flow
- **Signup:** Register with username, email, and password (hashed, validated backend-side)
- **Login:** Log in with username/email and password, receive a JWT token
- **JWT:** Used for authenticated requests (stored in localStorage)
- **Error Handling:** All errors returned as JSON, shown in the UI

---

## 🌗 Dark Mode
- Toggle between light and dark themes using the theme switcher in the UI
- All major pages and components are styled for both modes

---

## 📡 API & Backend
- See [`frontend/API.md`](frontend/API.md) for full backend API documentation
- See [`frontend/ARCHITECTURE.md`](frontend/ARCHITECTURE.md) for project structure and backend details

---

## 🏙️ Database Seeding
- Sample neighborhoods are loaded from `backend/seed/neighborhoods.json`
- Run `node seedNeighborhoods.js` in the backend to seed the database

---

## 🚢 Deployment
- See [`frontend/DEPLOYMENT.md`](frontend/DEPLOYMENT.md) for instructions on deploying both frontend and backend

---

## 📚 More Documentation
- [API Reference](frontend/API.md)
- [Architecture](frontend/ARCHITECTURE.md)
- [Security](frontend/SECURITY.md)
- [Deployment](frontend/DEPLOYMENT.md)
- [Database](frontend/DATABASE.md)
- [Environment Variables](frontend/ENVIRONMENT.md)

---

## 📝 License
MIT 