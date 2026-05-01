from fastapi import APIRouter
from app.api.routes import quiz

api_router = APIRouter(prefix="/api")

# Register our quiz routes
api_router.include_router(quiz.router)

# We can add auth, users, and history routes here later
# api_router.include_router(auth.router)
# api_router.include_router(history.router)

@api_router.get("/status")
def get_status():
    return {"status": "operational", "version": "v1"}
