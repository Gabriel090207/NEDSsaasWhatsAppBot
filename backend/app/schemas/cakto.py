from pydantic import BaseModel
from typing import Optional


class Customer(BaseModel):
    name: str
    email: str
    phone: Optional[str] = None


class Subscription(BaseModel):
    id: str
    status: str


class Product(BaseModel):
    id: str
    name: str


class PayloadData(BaseModel):
    customer: Customer
    subscription: Subscription
    product: Product


class CaktoWebhook(BaseModel):
    event: str
    data: PayloadData
    secret: str