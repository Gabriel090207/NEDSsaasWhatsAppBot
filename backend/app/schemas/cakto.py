from pydantic import BaseModel
from typing import Optional


class Customer(BaseModel):
    name: str
    email: str
    phone: Optional[str] = None


class Offer(BaseModel):
    name: str


class Subscription(BaseModel):
    id: str
    status: str
    next_payment_date: Optional[str] = None


class DataPayload(BaseModel):
    customer: Customer
    offer: Offer
    subscription: Subscription


class CaktoWebhook(BaseModel):
    event: str
    secret: str
    data: DataPayload