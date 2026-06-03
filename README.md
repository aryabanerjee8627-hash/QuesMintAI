# QuesMint

QuesMint is a premium, AI-powered quiz generation SaaS platform designed to transform educational material into high-quality, structured assessments.

### Landing Page
![Landing Page 1](ss_proofs/lp1.png)
![Landing Page 2](ss_proofs/lp2.png)
![Landing Page 3](ss_proofs/lp3.png)

## 🏗️ Architecture

### Backend (Python/FastAPI)
- **Framework**: FastAPI (Python 3.12+).
- **AI Engine**: Gemini 3.0 Flash (via `google-generativeai`).
- **Database**: Supabase PostgreSQL with `httpx` async client.

### Frontend (Next.js/React)
- **Framework**: Next.js 16 (App Router) + React 19.
- **Styling**: Tailwind CSS v4 + shadcn/ui ("Fresh Mint & Rich Navy").
- **Auth**: Supabase SSR.

![UI Interface](ss_proofs/uiinterface.png)

## 🚀 Key Features

*   **Intelligent Generation**: Hallucination-free quiz generation using Gemini 3.0 Flash.
*   **Professional Formatting**: Clean, printable PDF exports for classroom use.
*   **Advanced Previews**: Student and Answer Key views with B&W mode.


## 📑 Previews

| Student View | Answer Key View |
| :--- | :--- |
| ![Preview 1](ss_proofs/preview1.png) | ![Preview 2](ss_proofs/preview2.png) |

## 🌐 Deployment Status

| Service | URL |
| :--- | :--- |
| **Frontend** | [https://ques-mint-ai-a7tx.vercel.app](https://ques-mint-ai-a7tx.vercel.app) |
| **Backend** | [https://quesmintai.onrender.com](https://quesmintai.onrender.com) |

## 🛠️ Roadmap
1. **STEM/Math Support**: Finalizing KaTeX integration.
2. **Advanced Export**: Expanding to Markdown and interactive JSON.
3. **Resilience**: Specialized handlers for large multimodal inputs.

---
*Built by Arya Banerjee*
