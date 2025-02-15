from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import random

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/signal/{symbol}")
def get_signal(symbol: str):
    signals = [{"type": random.choice(["BUY", "SELL"])} for _ in range(10)]
    return {"symbol": symbol, "signals": signals}
