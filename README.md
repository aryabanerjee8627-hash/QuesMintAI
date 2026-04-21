# QuesMint MVP

## Setup

1. Copy env file:
   - PowerShell: `Copy-Item .env.example .env`
   - Bash: `cp .env.example .env`
2. Fill Supabase and Gemini values in `.env`.
3. Run app:
   - Local (no Docker):
     - Backend: `cd backend && ..\\.venv\\Scripts\\python -m uvicorn app.main:app --host 127.0.0.1 --port 8000`
     - Frontend: `cd frontend && npm run dev -- --host 127.0.0.1 --port 5173`
   - Docker dev: `docker compose up --build`
   - Docker prod profile: `docker compose -f docker-compose.yml -f docker-compose.prod.yml up --build`

## Apps

- Frontend: `http://localhost:5173` (or `5174` if `5173` is busy)
- Backend: `http://localhost:8000/api/health`

## Notes

- Frontend uses Supabase Auth for sign in/sign up.
- Backend verifies Supabase JWT on protected routes (`/api/auth/me`, `/api/quiz/history`).
- Backend CORS is controlled by `BACKEND_CORS_ORIGINS` (comma-separated).
