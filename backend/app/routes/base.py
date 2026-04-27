from fastapi import APIRouter

router = APIRouter()


@router.get("/")
def read_root():
    return {
        "message": "API do WhatsApp SaaS está funcionando!"
    }


@router.get("/health")
def health_check():
    return {
        "status": "ok"
    }