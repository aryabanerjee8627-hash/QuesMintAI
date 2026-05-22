import httpx
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from loguru import logger

from app.core.config import Settings, get_settings

security = HTTPBearer()

async def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security),
    settings: Settings = Depends(get_settings),
) -> dict:
    """
    Verifies the token directly with Supabase.
    This is more reliable than local decoding as it doesn't depend on 
    local secret matching.
    """
    token = credentials.credentials
    
    async with httpx.AsyncClient() as client:
        try:
            response = await client.get(
                f"{settings.SUPABASE_URL}/auth/v1/user",
                headers={
                    "Authorization": f"Bearer {token}",
                    "apikey": settings.SUPABASE_ANON_KEY
                }
            )
            
            if response.status_code != 200:
                logger.warning(f"Supabase auth failed: {response.text}")
                raise HTTPException(
                    status_code=status.HTTP_401_UNAUTHORIZED,
                    detail="Invalid or expired session",
                    headers={"WWW-Authenticate": "Bearer"},
                )
            
            user_data = response.json()
            return {
                "id": user_data.get("id"),
                "email": user_data.get("email")
            }
            
        except httpx.RequestError as e:
            logger.error(f"Network error during auth: {e}")
            raise HTTPException(
                status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
                detail="Authentication service unavailable"
            )
