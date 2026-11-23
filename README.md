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

## Current implementation

- React/Vite investigation interface with responsive case creation, evidence review, timeline, accusation, and verdict screens.
- Express API with MongoDB persistence, Groq generation, input checks, rate limiting, and secret-safe public case responses.
- A generated case must pass required suspect and evidence checks before it is saved. `culpritId` and the solution are excluded from normal case reads and only returned after an accusation.

See [spec.md](./spec.md) for the full product specification.
