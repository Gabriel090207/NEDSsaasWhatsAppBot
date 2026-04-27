from fastapi import APIRouter, Depends, HTTPException
from app.schemas.bot import CreateBot
from app.services.bot_service import create_bot
from app.core.deps import get_current_user

router = APIRouter(prefix="/bot", tags=["Bot"])


@router.post("/")
def create_new_bot(
    data: CreateBot,
    current_user: str = Depends(get_current_user)
):
    try:
        bot = create_bot(
            user_email=current_user,
            name=data.name
        )
        return bot

    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

from app.services.bot_service import get_bots_by_user


@router.get("/")
def list_bots(current_user: str = Depends(get_current_user)):
    bots = get_bots_by_user(current_user)
    return bots





from app.services.bot_service import get_bot_by_user
from fastapi import HTTPException


@router.get("/me")
def get_my_bot(current_user: str = Depends(get_current_user)):
    bot = get_bot_by_user(current_user)

    if not bot:
        raise HTTPException(status_code=404, detail="Bot não encontrado")

    return bot