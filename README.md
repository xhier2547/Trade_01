# 🚀 AI Trading Dashboard (IQ Option Real-time) 📊  

## 📌 **เกี่ยวกับโปรเจค**
AI Trading Dashboard เป็นแพลตฟอร์มที่ใช้ **IQ Option API** เพื่อดึงข้อมูลแท่งเทียนแบบ **เรียลไทม์** พร้อมแสดงกราฟ **GBP/USD** และให้คำแนะนำ **BUY/SELL** อัตโนมัติผ่าน AI Indicator  

✅ **อัปเดตราคาเรียลไทม์ทุก 1 นาที**  
✅ **แสดงแท่งเทียนและสัญญาณ BUY/SELL**  
✅ **ออกแบบ UI คล้าย IQ Option**  
✅ **ใช้ React.js + Chart.js + WebSocket API**  

---

## 🚀 **การติดตั้งและใช้งาน**
### 1️⃣ **Clone โปรเจค**
```sh
git clone https://github.com/xhier2547/Trade_01.git
cd Trade_01
```
### 2️⃣ **ติดตั้ง Dependenciesค**
```sh
npm install
```

### 3️⃣ ตั้งค่า API Token ของ IQ Option**
📌 เปิดไฟล์ src/services/IQOptionAPI.js
🔹 แก้ไข Token ของคุณที่บรรทัดนี้:
```javascript
const iqAPI = new IQOptionAPI("YOUR_IQ_OPTION_TOKEN");
```

### 4️⃣ รันโปรเจค**
```sh
npm start
```
✅ เปิด http://localhost:3000 เพื่อดู Dashboard

### ⚙️ โครงสร้างไฟล์**
csharp
```csharp
Trade_01/
│── backend/                     # โค้ดสำหรับ AI Indicator (ถ้ามี)
│── frontend/                    # โค้ดสำหรับแสดงผลบนเว็บ
│   ├── src/
│   │   ├── components/
│   │   │   ├── TradingChart.js   # กราฟแท่งเทียน + AI Signal
│   │   │   ├── Signal.js         # คำนวณจุด BUY/SELL
│   │   ├── services/
│   │   │   ├── IQOptionAPI.js    # เชื่อมต่อ IQ Option API
│   │   ├── App.js                # หน้าแรกของเว็บ
│   │   ├── index.js              # Main Entry
│   ├── public/
│── package.json                  # Dependencies ของ React
│── README.md                     # ไฟล์นี้
```
### 🧠 AI Indicator (กลยุทธ์การเทรด)**
📌 วิธีคำนวณสัญญาณ BUY/SELL
✅ ใช้ Simple Moving Average (SMA) และ ราคาปิด (Close Price)
✅ ถ้าราคาปิด สูงกว่า SMA → BUY Signal
✅ ถ้าราคาปิด ต่ำกว่า SMA → SELL Signal

🔹 ไฟล์ที่เกี่ยวข้อง:

📌 src/components/Signal.js
📌 backend/model.py (ถ้ามี AI Model ยังไม่ทำ)
