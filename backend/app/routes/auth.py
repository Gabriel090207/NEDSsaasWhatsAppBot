from fastapi import APIRouter, HTTPException
from app.core.firebase import db
from app.core.security import create_access_token

router = APIRouter(prefix="/auth", tags=["Auth"])


@router.post("/login")
def login(email: str):
    user_ref = db.collection("users").document(email)
    user_doc = user_ref.get()

    if not user_doc.exists:
        raise HTTPException(status_code=404, detail="Usuário não encontrado")

    user_data = user_doc.to_dict()

    if not user_data.get("is_active"):
        raise HTTPException(status_code=403, detail="Usuário inativo")

    token = create_access_token({
        "email": email
    })

    return {
        "access_token": token,
        "token_type": "bearer",
        "user": user_data
    }