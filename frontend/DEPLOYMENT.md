# Deployment Guide

This guide covers how to deploy both the NeighborFit frontend and backend.

---

## Live Application

- **Frontend Demo**: [https://neighborfitforyou.netlify.app/](https://neighborfitforyou.netlify.app/)
- **Backend**: (Host yourself or use a service like Render/Railway)

---

## Backend Deployment

### Prerequisites
- Node.js (16+)
- MongoDB database (local or cloud, e.g., MongoDB Atlas)

### Environment Variables
Create a `.env` file in the `backend/` directory:
```
PORT=4000
MONGODB_URI=mongodb://localhost:27017/neighborfit # or your Atlas URI
JWT_SECRET=your_jwt_secret
```

### Local Deployment
1. Install dependencies:
   ```bash
   cd backend
   npm install
   ```
2. Start MongoDB (if local)
3. Start the backend:
   ```bash
   npm run dev
   # or for production
   npm run start
   ```
4. The backend will run at `http://localhost:4000`

### Cloud Deployment (Render/Railway/Other)
- Create a new Node.js service
- Set environment variables in the dashboard
- Connect to your MongoDB Atlas URI
- Deploy from GitHub or upload code

---

## Frontend Deployment

### Netlify (Recommended)
1. Build the frontend:
   ```bash
   cd frontend
   npm install
   npm run build
   ```
2. Deploy the `dist/` folder to Netlify (drag & drop or Git integration)

### Vercel/Other
- Similar process: build, then deploy the `dist/` folder

---

## Connecting Frontend & Backend
- By default, the frontend expects the backend at `http://localhost:4000` (or your deployed backend URL)
- Update API URLs in the frontend if deploying backend elsewhere

---

## Seeding the Database
To load sample neighborhoods:
```bash
cd backend
node seedNeighborhoods.js
```
This will import data from `backend/seed/neighborhoods.json` into your MongoDB database.

---

## Troubleshooting
- **CORS errors**: Make sure backend allows requests from your frontend domain
- **MongoDB connection errors**: Check your URI and network/firewall settings
- **Port conflicts**: Change `PORT` in `.env` if needed

---

## Support
For deployment issues:
- Check backend and frontend logs
- Review Netlify/Render/Railway docs
- Contact: deployment@neighborfit.com