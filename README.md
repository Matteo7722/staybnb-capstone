# Staybnb - Airbnb Clone

A full-stack Airbnb-style clone built for the supplied assignment brief.

## Stack
- React + Vite + CSS
- Node.js + Express
- MongoDB + Mongoose
- JWT authentication
- Multer image uploads

## Run locally

### 1. Backend
```bash
cd backend
npm install
cp .env.example .env
npm run seed
npm run dev
```

The API runs on `http://localhost:5000`.

### 2. Frontend
Open another terminal:
```bash
cd frontend
npm install
npm run dev
```

Open the URL printed by Vite, normally `http://localhost:5173`.

## Demo accounts
After running the seed:
- Admin/host: `admin@staybnb.com` / `password123`
- User: `jane@example.com` / `password123`

## MongoDB
Set `MONGO_URI` in `backend/.env`. A local MongoDB instance can use:
`mongodb://127.0.0.1:27017/staybnb`

The image upload field is optional in the brief. The app supports both uploaded files and image URLs.
