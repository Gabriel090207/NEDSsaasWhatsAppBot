import os
import json
import firebase_admin
from firebase_admin import credentials, firestore


def get_firebase_cred():
    firebase_env = os.getenv("FIREBASE_CREDENTIALS")

    # PRODUÇÃO (Render)
    if firebase_env:
        cred_dict = json.loads(firebase_env)
        return credentials.Certificate(cred_dict)

    # LOCAL
    return credentials.Certificate(
        "app/core/firebase.json"
    )


if not firebase_admin._apps:
    cred = get_firebase_cred()
    firebase_admin.initialize_app(cred)

db = firestore.client()