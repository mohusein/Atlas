# Atlas

Enterprise AI Knowledge Intelligence Platform. Atlas lets employees ask questions against company documents and inspect the sources behind each answer.

## Current status

The repository contains the Phase 1 application foundation: a React + TypeScript + Vite frontend, a modular FastAPI backend, PostgreSQL with pgvector, Redis, Celery, and an initial database migration. Document ingestion and grounded chat are planned next; no generated answer is returned until retrieval is implemented.

## Run locally

Requirements: Docker Desktop with Compose.

1. Copy `.env.example` to `.env` and set a unique `SECRET_KEY` and `JWT_SECRET_KEY`.
2. Start services: `docker compose up --build`.
3. Open the UI at <http://localhost:5173>, API docs at <http://localhost:8000/docs>, and health at <http://localhost:8000/health>.

The API applies database migrations on startup. PostgreSQL is exposed on port 5432 and Redis on 6379 for local development. Do not expose these ports in production.

## Development without Docker

Backend (Python 3.12):

```sh
cd backend
python -m venv .venv && source .venv/bin/activate
pip install -e '.[dev]'
alembic upgrade head
uvicorn app.main:app --reload
```

Frontend (Node 20+):

```sh
cd frontend
npm install
npm run dev
```

Set `DATABASE_URL` and `REDIS_URL` to local service addresses. API settings are defined in `backend/app/core/config.py` and documented in `.env.example`.

## Architecture and security

See [docs/architecture.md](docs/architecture.md) and [docs/er-diagram.md](docs/er-diagram.md). Authentication and document authorization are server responsibilities. The initial API exposes health checks only until authentication and the data access layer are implemented. Uploads must be size-limited, type-validated, stored under generated identifiers, and checked against permissions before retrieval. Secrets belong in environment configuration, never source control.

## Next milestones

1. Authentication, user/role management, persistence repositories.
2. Secure uploads, extraction, configurable chunking, Celery ingestion jobs, pgvector embeddings.
3. Permission-filtered retrieval, grounded answer generation and validated citations.
4. Conversation UI and document/evaluation dashboards.
5. Security and quality evaluation, deployment pipeline, operations documentation.

API request/response schemas are documented by FastAPI OpenAPI at `/docs`.
