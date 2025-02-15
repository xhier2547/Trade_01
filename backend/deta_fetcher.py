import requests

BINANCE_API_URL = "https://api.binance.com/api/v3/ticker/price"

def get_market_data(symbol: str):
    response = requests.get(f"{BINANCE_API_URL}?symbol={symbol.upper()}")
    if response.status_code == 200:
        return response.json()
    return None
