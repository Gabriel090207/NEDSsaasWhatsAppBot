from app.core.firebase import db


def get_flow(bot_id: str):
    doc = db.collection("flows").document(bot_id).get()
    if not doc.exists:
        return None
    return doc.to_dict().get("flow")


def get_session(phone: str):
    doc = db.collection("sessions").document(phone).get()

    if not doc.exists:
        return {"current_node": None}

    return doc.to_dict()


def save_session(phone: str, data: dict):
    db.collection("sessions").document(phone).set(data)


def execute_flow(bot_id: str, phone: str, user_message: str):
    flow = get_flow(bot_id)

    if not flow:
        return {"tipo": "texto", "mensagem": "Fluxo não encontrado."}

    session = get_session(phone)

    # 🔥 Se não tiver node atual → começa no start
    if not session.get("current_node"):
        current_node = flow["start"]
    else:
        current_node = session["current_node"]

    node = flow["nodes"].get(current_node)

    if not node:
        return {"tipo": "texto", "mensagem": "Erro no fluxo."}

    response = None
    next_node = None

    # -----------------------
    # TEXT
    # -----------------------
    if node["type"] == "text":
        response = {
            "tipo": "texto",
            "mensagem": node.get("mensagem")
        }

        next_node = node.get("next")

    # -----------------------
    # BUTTONS
    # -----------------------
    elif node["type"] == "buttons":

        if user_message:
            for btn in node.get("botoes", []):
                if user_message == btn["id"]:
                    next_node = btn.get("next")
                    break

        response = {
            "tipo": "botoes",
            "mensagem": node.get("mensagem"),
            "botoes": [
                {"id": b["id"], "label": b["label"]}
                for b in node.get("botoes", [])
            ]
        }

    # -----------------------
    # IMAGE
    # -----------------------
    elif node["type"] == "image":
        response = {
            "tipo": "imagem",
            "url": node.get("url")
        }

        next_node = node.get("next")

    # 🔥 Atualiza sessão
    if next_node:
        session["current_node"] = next_node

    save_session(phone, session)

    return response