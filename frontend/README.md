# QuesMint 🚀

> AI-powered quiz generation platform that transforms notes, PDFs, images, and study materials into high-quality quizzes, MCQs, and mock tests.



---

# ✨ Why QuesMint Exists

QuesMint was built with a deeply personal purpose.

My mother is a teacher, and I constantly saw how much time teachers spend creating worksheets, MCQs, mock tests, and revision papers manually. Existing tools felt slow, generic, or lacked proper educational understanding.

So I built **QuesMint** — an AI-powered platform designed to reduce the repetitive work of question creation while still maintaining quality, structure, and usability.

The project is heavily AI-assisted, but the vision, architecture decisions, UX direction, integration flow, and product thinking were all intentionally designed to solve a real problem.

---

# 🌟 What QuesMint Does

QuesMint allows users to:

* 📄 Upload notes, PDFs, and study material
* 🖼️ Generate quizzes from images and multimodal content
* 🧠 Use AI-powered contextual understanding for better questions
* 📚 Create MCQs, practice tests, and revision quizzes instantly
* 📜 View previous quiz history
* ⚡ Experience a fast, premium SaaS-style UI
* 🌙 Work inside a modern dark-mode-first interface

---

# 🏗️ Tech Stack

## Frontend

| Technology      | Purpose                                 |
| --------------- | --------------------------------------- |
| Next.js 16      | App Router + Full-stack React Framework |
| React 19        | UI Rendering                            |
| Tailwind CSS v4 | Styling System                          |
| shadcn/ui       | Component System                        |
| Framer Motion   | Animations + Microinteractions          |
| Supabase SSR    | Authentication + Session Handling       |
| Sonner          | Toast Notifications                     |

---

## Backend

| Technology          | Purpose                       |
| ------------------- | ----------------------------- |
| FastAPI             | API Framework                 |
| Python 3.12+        | Backend Runtime               |
| Supabase/PostgreSQL | Database Layer                |
| Gemini 1.5 Flash    | AI Generation Engine          |
| python-jose         | JWT Authentication            |
| loguru              | Structured Logging            |
| httpx AsyncClient   | Async Database/API Operations |

---

# 🧠 Core Architecture

```text
Frontend (Next.js)
        ↓
Centralized API Layer
        ↓
FastAPI Backend
        ↓
AI Services + Database Layer
        ↓
Supabase PostgreSQL
```

QuesMint follows a clean layered architecture:

```text
API Routes → Services → Database
```

This structure keeps the project scalable, modular, and maintainable.

---

# 🔥 Key Features

## 🎯 AI-Powered Quiz Generation

Generate contextual quizzes from:

* PDFs
* Notes
* Images
* Study material
* Multimodal content

---

## 🧩 Multimodal RAG Pipeline

The backend includes:

* AI-powered contextual extraction
* "Full Scan" anti-bias logic
* Structured question generation
* Better semantic understanding of uploaded material

---

## 🌙 Premium Dark UI

Inspired by:

* Linear
* Perplexity
* Modern SaaS products

Features:

* Soft violet/blue accents
* Smooth transitions
* Skeleton loaders
* Responsive layouts
* Minimal visual clutter

---

## 🔒 Secure Authentication

Implemented using:

* Supabase SSR
* JWT verification
* Protected backend routes
* Server-side session management

---

## 🐳 Full Dockerized Setup

Includes:

* Optimized Dockerfiles
* docker-compose orchestration
* Unified frontend/backend execution
* Easy local deployment

---

# 📊 Current Progress

## ✅ Completed

### Frontend

* Landing Page
* Authentication Pages
* Dashboard
* Create Quiz Flow
* Quiz Execution UI
* History Page
* Premium Design System

### Backend

* FastAPI API Structure
* JWT Security Layer
* AI Service Integration
* Database Persistence Layer
* Structured Logging
* Quiz Generation Endpoint

### Integration

* Frontend ↔ Backend API Communication
* FormData file uploads
* Docker setup

---

## ⏳ In Progress

* Advanced error handling
* Token/credit tracking system
* Full auth synchronization
* Automated testing suite

---

# 🔌 API Endpoints

| Method | Endpoint             | Description                       |
| ------ | -------------------- | --------------------------------- |
| POST   | `/api/quiz/generate` | Generate quiz from uploaded files |
| GET    | `/api/quiz/history`  | Retrieve quiz history             |
| GET    | `/api/health`        | System health check               |

---

# 🎨 Design Philosophy

QuesMint is designed around three principles:

## 1. Speed

Every interaction should feel instant.

## 2. Simplicity

Minimal UI clutter with strong visual hierarchy.

## 3. Feedback

Every async action includes:

* Skeleton loaders
* Loading indicators
* Toast notifications
* Smooth state transitions

---

# 📁 Suggested Project Structure

```text
quesmint/
│
├── frontend/
│   ├── src/
│   ├── components/
│   ├── app/
│   └── lib/
│
├── backend/
│   ├── app/
│   ├── services/
│   ├── routes/
│   └── database/
│
├── docker-compose.yml
└── README.md
```

---

# 🚀 Local Setup

## 1. Clone Repository

```bash
git clone https://github.com/yourusername/quesmint.git
cd quesmint
```

---

## 2. Configure Environment Variables

Create:

```bash
frontend/.env.local
backend/.env
```

Add:

```env
SUPABASE_URL=
SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
GEMINI_API_KEY=
```

---

## 3. Run with Docker

```bash
docker-compose up --build
```

---

# 🧪 Planned Testing Stack

| Area     | Tool       |
| -------- | ---------- |
| Backend  | Pytest     |
| Frontend | Vitest     |
| E2E      | Playwright |

---

# 💡 What Makes This Project Special

Even though AI tools were heavily used during development, this project still required:

* Product thinking
* Architecture planning
* API integration knowledge
* UI/UX direction
* Debugging and iteration
* State management understanding
* Backend/frontend orchestration
* Real-world problem solving

Using AI effectively is also a skill.

QuesMint is not just a tutorial clone — it solves a genuine educational workflow problem.

---

# 🚧 Project Status

QuesMint is currently a prototype and is not publicly deployed yet.

The focus right now is on:

* Refining the core product e

---

# 🛣️ Future Roadmap

* 📊 Teacher analytics dashboard
* 🧾 Export quizzes as PDFs
* 🧠 Difficulty tuning
* 🌍 Multi-language generation
* 👥 Classroom management
* 📱 Mobile-responsive optimization
* ☁️ Cloud deployment pipeline
* 💳 Subscription/credit system

---

# 🤝 Contributing

Contributions, ideas, and feedback are welcome.

If you find bugs or have feature suggestions, feel free to open an issue or pull request.

---

# 📜 License

MIT License

---

# ❤️ Final Note

QuesMint started as a project for my mother.

It became a full-stack AI SaaS product that taught me architecture, UI/UX systems, backend engineering, API design, AI integration, and product development.

And honestly — that journey matters more than whether every line was handwritten.
