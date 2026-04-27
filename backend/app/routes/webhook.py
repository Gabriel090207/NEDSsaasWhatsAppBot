from fastapi import APIRouter, HTTPException
from app.schemas.cakto import CaktoWebhook
from app.services.user_service import (
    create_or_update_user,
    deactivate_user,
    mark_payment_failed,
    renew_user
)
import os

router = APIRouter(prefix="/webhook", tags=["Webhook"])


@router.post("/cakto")
async def cakto_webhook(payload: CaktoWebhook):
    print("Webhook recebido:", payload.event)

    secret_env = os.getenv("CAKTO_SECRET")

    if secret_env and payload.secret != secret_env:
        raise HTTPException(
            status_code=401,
            detail="Secret inválido"
        )

    email = payload.data.customer.email
    name = payload.data.customer.name
    plan = payload.data.offer.name
    subscription_id = payload.data.subscription.id
    next_payment = payload.data.subscription.next_payment_date

    # NOVA ASSINATURA
    if payload.event == "subscription_created":
        user = create_or_update_user(
            name=name,
            email=email,
            plan=plan,
            subscription_id=subscription_id,
            next_payment_date=next_payment
        )

        return {"status": "user_created", "user": user}

    # RENOVOU
    elif payload.event == "subscription_renewed":
        renew_user(email, next_payment)
        return {"status": "renewed"}

    # CANCELADA
    elif payload.event == "subscription_canceled":
        deactivate_user(email)
        return {"status": "canceled"}

    # COBRANÇA FALHOU
    elif payload.event == "subscription_renewal_refused":
        mark_payment_failed(email)
        return {"status": "payment_failed"}

    return {"status": "ignored"}