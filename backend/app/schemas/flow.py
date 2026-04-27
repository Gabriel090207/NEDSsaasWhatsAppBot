from pydantic import BaseModel
from typing import Dict, Any


class Flow(BaseModel):
    start: str
    nodes: Dict[str, Any]