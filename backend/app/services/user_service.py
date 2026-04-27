from app.core.firebase import db
from datetime import datetime


def create_or_update_user(
    name: str,
    email: str,
    plan: str,
    subscription_id: str,
    next_payment_date: str = None
):
    now = datetime.utcnow().isoformat()

    user_ref = db.collection("users").document(email)
    user_doc = user_ref.get()

    payload = {
        "name": name,
        "email": email,
        "plan": plan,
        "subscription_id": subscription_id,
        "status": "active",
        "is_active": True,
        "updated_at": now,
        "last_payment": now,
        "next_payment_date": next_payment_date
    }

    if not user_doc.exists:
        payload["created_at"] = now
        user_ref.set(payload)
    else:
        user_ref.update(payload)

    return payload


def deactivate_user(email: str):
    now = datetime.utcnow().isoformat()

    db.collection("users").document(email).update({
        "status": "canceled",
        "is_active": False,
        "updated_at": now
    })


def mark_payment_failed(email: str):
    now = datetime.utcnow().isoformat()

    db.collection("users").document(email).update({
        "status": "payment_failed",
        "is_active": False,
        "updated_at": now
    })


def renew_user(email: str, next_payment_date: str = None):
    now = datetime.utcnow().isoformat()

    db.collection("users").document(email).update({
        "status": "active",
        "is_active": True,
        "updated_at": now,
        "last_payment": now,
        "next_payment_date": next_payment_date
    })