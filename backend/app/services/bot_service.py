from app.core.firebase import db
from datetime import datetime


def create_bot(user_email: str, name: str):
    # Verifica se já existe bot
    existing = db.collection("bots").where("user_id", "==", user_email).stream()

    for doc in existing:
        raise Exception("Usuário já possui um bot")

    from datetime import datetime

    now = datetime.utcnow().isoformat()

    bot_data = {
        "name": name,
        "user_id": user_email,
        "is_active": True,
        "created_at": now,
        "updated_at": now
    }

    doc_ref = db.collection("bots").add(bot_data)

    return {
        "id": doc_ref[1].id,
        **bot_data
    }


def get_bots_by_user(user_email: str):
    bots_ref = db.collection("bots").where("user_id", "==", user_email)
    docs = bots_ref.stream()

    bots = []

    for doc in docs:
        bot_data = doc.to_dict()
        bot_data["id"] = doc.id
        bots.append(bot_data)

    return bots



def get_bot_by_user(user_email: str):
    bots_ref = db.collection("bots").where("user_id", "==", user_email)
    docs = list(bots_ref.stream())

    if not docs:
        return None

    doc = docs[0]
    bot_data = doc.to_dict()
    bot_data["id"] = doc.id

    return bot_data