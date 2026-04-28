from fastapi import APIRouter, HTTPException
from app.schemas.cakto import CaktoWebhook
from app.services.user_service import (
    create_or_update_user,
    deactivate_user,
    mark_payment_failed
)
from app.services.email_service import send_welcome_email
import os

router = APIRouter(prefix="/webhook", tags=["Webhook"])


@router.post("/cakto")
async def cakto_webhook(payload: CaktoWebhook):
    secret_env = os.getenv("CAKTO_SECRET")

    if payload.secret != secret_env:
        raise HTTPException(
            status_code=401,
            detail="Webhook inválido"
        )

    event = payload.event
    customer = payload.data.customer
    product = payload.data.product

    email = customer.email
    name = customer.name
    plan = product.name

    print("Evento recebido:", event)

    # NOVA ASSINATURA
    if event == "subscription_created":
        user = create_or_update_user(
            name=name,
            email=email,
            plan=plan
        )

        # ENVIA EMAIL
        send_welcome_email(
            to_email=email,
            customer_name=name
        )

        return {
            "status": "user_created",
            "user": user
        }

    # RENOVAÇÃO
    elif event == "subscription_renewed":
        user = create_or_update_user(
            name=name,
            email=email,
            plan=plan
        )

        return {
            "status": "renewed",
            "user": user
        }

    # CANCELADA
    elif event == "subscription_canceled":
        deactivate_user(email)
        return {"status": "canceled"}

    # COBRANÇA FALHOU
    elif event == "subscription_renewal_refused":
        mark_payment_failed(email)
        return {"status": "payment_failed"}

    return {"status": "ignored"}