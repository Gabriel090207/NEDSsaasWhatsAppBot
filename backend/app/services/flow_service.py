from app.core.firebase import db
from datetime import datetime


def save_flow(bot_id: str, flow_data: dict):
    now = datetime.utcnow().isoformat()

    db.collection("flows").document(bot_id).set({
        "bot_id": bot_id,
        "flow": flow_data,
        "updated_at": now
    })

    return {
        "bot_id": bot_id,
        "flow": flow_data
    }