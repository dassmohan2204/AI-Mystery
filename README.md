# AI Mystery Room

AI Mystery Room turns a user-written premise into a fictional detective case. Players review suspects and connected evidence, submit one accusation, then receive the solution.

## Requirements

- Node.js 20 or newer
- MongoDB (local or Atlas)
- Groq API key

## Run locally

1. Copy `backend/.env.example` to `backend/.env` and set `MONGODB_URI` and `GROQ_API_KEY`. Ensure MongoDB is running or your Atlas cluster allows your network address.
2. From the repository root, install dependencies: `npm install`, `npm --prefix backend install`, and `npm --prefix frontend install`.
3. Start the API and web app together with `npm run dev`.
4. Open `http://localhost:5173`.

The API is at `http://localhost:4000/api/v1`. The frontend may be pointed at another API with `VITE_API_URL`.

## Deploy on Render

This repository can run as one Render web service: Express serves the built React app and the API on the same domain.

1. Push the latest `main` branch to GitHub and connect that repository to a new **Web Service** in Render.
2. Set the service root directory to the repository root and runtime to **Node**.
3. Set the build command to `npm install && npm --prefix backend install && npm --prefix frontend install && npm run build`.
4. Set the start command to `npm start` and health check path to `/api/health/live`.
5. Add `MONGODB_URI`, `GROQ_API_KEY`, and `GROQ_MODEL` in Render's Environment settings. Use your Atlas connection string and Groq key; do not commit them to GitHub. Set `NODE_ENV` to `production`.
6. Create the Render service. In its dashboard, open **Connect → Outbound** and copy its outbound IP ranges. Add those ranges in Atlas under **Network Access**, then restart the Render service so it reconnects to MongoDB.
7. Open `https://<your-service>.onrender.com/api/health`; it should return `success: true` and `database: "connected"`. Open the service root URL to use the app.

Render's free web services may sleep when idle, so the first request after inactivity can take longer. Render uses the `PORT` environment variable automatically.

## Current implementation

- React/Vite investigation interface with responsive case creation, evidence review, timeline, accusation, and verdict screens.
- Express API with MongoDB persistence, Groq generation, input checks, rate limiting, and secret-safe public case responses.
- A generated case must pass required suspect and evidence checks before it is saved. `culpritId` and the solution are excluded from normal case reads and only returned after an accusation.

See [spec.md](./spec.md) for the full product specification.
