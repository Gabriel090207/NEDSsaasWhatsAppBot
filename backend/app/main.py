from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# webhook
from app.routes import base, webhook

# Rotas base
from app.routes import auth
from app.routes import user
from app.routes import bot
from app.routes import flow

app = FastAPI(
    title="WhatsApp SaaS API",
    description="API inicial do projeto SaaS de automação para WhatsApp",
    version="0.1.0"
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Rotas webhook
app.include_router(webhook.router)

# Rotas base
app.include_router(base.router)
app.include_router(auth.router)
app.include_router(user.router)
app.include_router(bot.router)
app.include_router(flow.router)