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


from app.services.email_service import send_welcome_email


@router.get("/test-email")
def test_email():
    send_welcome_email(
        to_email="contato@nedsservicesoficial.com",
        customer_name="Gabriel"
    )

    return {"status": "email enviado"}