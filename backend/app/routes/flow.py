from fastapi import APIRouter, Depends, HTTPException
from app.schemas.flow import Flow
from app.services.flow_service import save_flow
from app.core.deps import get_current_user
from app.core.firebase import db
import uuid

router = APIRouter(prefix="/flow", tags=["Flow"])


@router.post("/{bot_id}")
def create_flow(
    bot_id: str,
    data: Flow,
    current_user: str = Depends(get_current_user)
):
    return save_flow(bot_id, data.dict())


# CRIAR FLUXO SIMPLES
@router.post("/")
def create_simple_flow(
    payload: dict,
    current_user: str = Depends(get_current_user)
):
    name = payload.get("name")

    if not name:
        raise HTTPException(
            status_code=400,
            detail="Nome obrigatório"
        )

    flow_id = str(uuid.uuid4())

    db.collection("flows").document(flow_id).set({
        "id": flow_id,
        "name": name,
        "user_email": current_user,
        "nodes": [],
        "edges": []
    })

    return {
        "id": flow_id,
        "name": name,
        "nodes": [],
        "edges": []
    }


# LISTAR FLUXOS DO USUÁRIO
@router.get("/")
def list_flows(
    current_user: str = Depends(get_current_user)
):
    docs = (
        db.collection("flows")
        .where("user_email", "==", current_user)
        .stream()
    )

    flows = []

    for doc in docs:
        flows.append(doc.to_dict())

    return flows


# EXCLUIR FLUXO
@router.delete("/{flow_id}")
def delete_flow(
    flow_id: str,
    current_user: str = Depends(get_current_user)
):
    ref = db.collection("flows").document(flow_id)
    doc = ref.get()

    if not doc.exists:
        raise HTTPException(
            status_code=404,
            detail="Fluxo não encontrado"
        )

    data = doc.to_dict()

    if data["user_email"] != current_user:
        raise HTTPException(
            status_code=403,
            detail="Sem permissão"
        )

    ref.delete()

    return {"message": "Fluxo removido"}


@router.put("/{flow_id}/config")
def update_flow_config(
    flow_id: str,
    payload: dict,
    current_user: str = Depends(get_current_user)
):
    ref = db.collection("flows").document(flow_id)
    doc = ref.get()

    if not doc.exists:
        raise HTTPException(status_code=404, detail="Fluxo não encontrado")

    data = doc.to_dict()

    if data["user_email"] != current_user:
        raise HTTPException(status_code=403, detail="Sem permissão")

    ref.update({
        "is_initial": payload.get("is_initial", False),
        "trigger_type": payload.get("trigger_type", "all"),
        "keywords": payload.get("keywords", []),
        "timeout_minutes": payload.get("timeout_minutes", 30),
    })

    return {"message": "Configuração salva"}


@router.get("/{flow_id}")
def get_flow(
    flow_id: str,
    current_user: str = Depends(get_current_user)
):
    ref = db.collection("flows").document(flow_id)
    doc = ref.get()

    if not doc.exists:
        raise HTTPException(status_code=404, detail="Fluxo não encontrado")

    data = doc.to_dict()

    if data["user_email"] != current_user:
        raise HTTPException(status_code=403, detail="Sem permissão")

    return data


@router.put("/{flow_id}")
def update_flow(
    flow_id: str,
    payload: dict,
    current_user: str = Depends(get_current_user)
):
    ref = db.collection("flows").document(flow_id)
    doc = ref.get()

    if not doc.exists:
        raise HTTPException(status_code=404, detail="Fluxo não encontrado")

    data = doc.to_dict()

    if data["user_email"] != current_user:
        raise HTTPException(status_code=403, detail="Sem permissão")

    ref.update({
        "nodes": payload.get("nodes", []),
        "edges": payload.get("edges", []),
    })

    return {"message": "Fluxo salvo"}