# QuesMint Project Overview

QuesMint is a premium, AI-powered quiz generation SaaS platform designed to streamline the creation of high-quality educational materials. 

## Project Goals
- **Efficiency**: Automate the conversion of educational source material into structured, diverse quizzes.
- **Academic Rigor**: Ensure high-quality, hallucination-free output through specialized AI grounding.
- **Professional Presentation**: Provide clean, standardized, and exportable (PDF) quiz formats suitable for classroom use.

## Architecture

### Backend (Python/FastAPI)
- **API Framework**: FastAPI for high-performance, asynchronous request handling.
- **AI Engine**: Gemini 3.0 Flash providing advanced generative capabilities with structured constraints.
- **Data Persistence**: Supabase (PostgreSQL/PostgREST) managed via asynchronous clients.
- **Authentication**: Direct integration with Supabase Auth for secure user session management.

### Frontend (Next.js/React)
- **Framework**: Next.js 16 with App Router and React 19.
- **Design System**: "Fresh Mint & Rich Navy" aesthetic, utilizing Tailwind CSS v4 and shadcn/ui.
- **UI Focus**: Accessibility-first design, high-contrast interfaces, and interactive components for quiz editing.

## Deployment Status (as of May 27, 2026)

The project is currently live in production environments:

| Service | Deployment URL |
| :--- | :--- |
| **Frontend** | [https://ques-mint-ai-a7tx.vercel.app](https://ques-mint-ai-a7tx.vercel.app) |
| **Backend** | [https://quesmintai.onrender.com](https://quesmintai.onrender.com) |

## Development Status
The core platform is successfully launched. Current focus has shifted to:
1. **STEM/Math Support**: Refining KaTeX integration.
2. **Advanced Export**: Adding Markdown and interactive JSON export formats.
3. **Resilience**: Enhancing AI service error handling for large-scale document inputs.
