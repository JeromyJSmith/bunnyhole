from fastapi import FastAPI
from inngest.fast_api import serve
from .inngest_client import inngest_client
from . import functions

app = FastAPI()

serve(app, inngest_client, functions.fns)

@app.get("/health")
def health_check():
    return {"status": "ok"}
