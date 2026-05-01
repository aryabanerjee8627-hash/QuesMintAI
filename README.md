# QuesMint 🚀

AI-powered quiz generation platform that transforms notes, PDFs, images, and study materials into quizzes, MCQs, and mock tests.

---

## ✨ Why QuesMint Exists

QuesMint was built to solve a real educational workflow problem.

My mother is a teacher, and I saw how time-consuming it was to manually create worksheets, MCQs, revision papers, and mock tests. Existing tools often felt generic or inefficient, so I started building a platform focused on speed, usability, and better AI-assisted question generation.

The project combines full-stack development, AI integration, and modern SaaS-style UI/UX design into a single learning-focused platform.

---

## 🌟 Features

* 📄 Generate quizzes from notes and PDFs
* 🖼️ Create quizzes from images and multimodal content
* 🧠 AI-powered contextual question generation
* 📚 MCQs, practice tests, and revision quizzes
* 📜 Quiz history tracking
* 🌙 Modern dark-mode-first UI
* ⚡ Fast and responsive experience

---

## 🏗️ Tech Stack

### Frontend

* Next.js
* React
* Tailwind CSS
* shadcn/ui
* Framer Motion
* Supabase SSR

### Backend

* FastAPI
* Python
* PostgreSQL / Supabase
* Gemini API
* JWT Authentication

### DevOps

* Docker
* docker-compose

---

## 🧠 Architecture

```text
Frontend (Next.js)
        ↓
API Layer
        ↓
FastAPI Backend
        ↓
AI Services + Database
        ↓
Supabase PostgreSQL
```

Project structure follows a modular layered architecture:

```text
API Routes → Services → Database
```

---

## 🔥 Core Features

### AI Quiz Generation

Generate quizzes from:

* PDFs
* Notes
* Images
* Study materials

### Multimodal Processing

* Context-aware extraction
* Structured question generation
* Improved semantic understanding

### Authentication

* Supabase SSR authentication
* JWT verification
* Protected API routes

### Modern UI

Inspired by modern SaaS products with:

* Smooth animations
* Skeleton loaders
* Responsive layouts
* Minimal UI clutter

---

## 📊 Current Status

### ✅ Completed

* Authentication system
* Dashboard UI
* Quiz generation flow
* Quiz history
* FastAPI backend structure
* AI integration
* Docker setup
* Frontend ↔ Backend integration

### ⏳ In Progress

* Advanced error handling
* Token/credit tracking
* Automated testing
* Deployment pipeline

---

## 🔌 API Endpoints

| Method | Endpoint             | Description                       |
| ------ | -------------------- | --------------------------------- |
| POST   | `/api/quiz/generate` | Generate quiz from uploaded files |
| GET    | `/api/quiz/history`  | Retrieve quiz history             |
| GET    | `/api/health`        | Health check                      |

---

## 🚀 Local Setup

### 1. Clone Repository

```bash
git clone https://github.com/yourusername/quesmint.git
cd quesmint
```

### 2. Configure Environment Variables

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

### 3. Run with Docker

```bash
docker-compose up --build
```

---

## 🛣️ Roadmap

* 📊 Teacher analytics dashboard
* 🧾 PDF export support
* 🧠 Difficulty tuning
* 🌍 Multi-language generation
* 👥 Classroom management
* ☁️ Cloud deployment
* 💳 Subscription system

---

## 🤝 Contributing

Contributions, ideas, and feedback are welcome.

Feel free to open issues or submit pull requests.

---

## 📜 License

MIT License

---

## ❤️ Final Note

QuesMint started as a small project inspired by a real classroom problem and evolved into a full-stack AI application focused on educational productivity.

The project helped me learn backend engineering, frontend architecture, AI integration, Docker, authentication systems, and product-focused UI/UX design through building something practical and useful.
