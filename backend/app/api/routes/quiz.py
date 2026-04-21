from fastapi import APIRouter, Depends

from app.api.deps.auth import get_current_user

router = APIRouter(prefix="/quiz", tags=["quiz"])


@router.get("/history")
def list_quiz_history(current_user: dict = Depends(get_current_user)) -> dict:
    return {"user_id": current_user["id"], "items": []}
