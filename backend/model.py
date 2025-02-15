import random

def get_trading_signal(symbol: str):
    # โมเดล ML คำนวณสัญญาณซื้อ/ขาย (ตอนนี้ใช้สุ่ม)
    return random.choice(["BUY", "SELL", "HOLD"])
