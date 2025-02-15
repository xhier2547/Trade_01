class IQOptionAPI {
    constructor(token) {
      this.token = token;
      this.ws = null;
      this.isConnected = false;
      this.candles = [];
    }
  
    connect() {
      return new Promise((resolve, reject) => {
        this.ws = new WebSocket("wss://iqoption.com/echo/websocket");
  
        this.ws.onopen = () => {
          console.log("✅ Connected to IQ Option WebSocket");
          this.isConnected = true;
          this.authenticate();
          this.keepAlive();
          this.checkMarketStatus(); // ✅ ตรวจสอบว่าตลาดเปิดหรือปิด
          resolve();
        };
  
        this.ws.onmessage = (message) => {
          const data = JSON.parse(message.data);
          if (data.name === "candles") {
            this.candles = data.msg.candles;
          }
        };
  
        this.ws.onerror = (error) => {
          console.error("❌ WebSocket Error:", error);
          reject(error);
        };
  
        this.ws.onclose = () => {
          console.log("🔌 Disconnected from IQ Option WebSocket");
          this.isConnected = false;
          setTimeout(() => this.reconnect(), 5000);
        };
      });
    }
  
    authenticate() {
      const authData = {
        name: "authenticate",
        msg: { token: this.token }
      };
      this.ws.send(JSON.stringify(authData));
    }
  
    subscribeCandles(asset, interval) {
      const subscribeData = {
        name: "subscribeMessage",
        msg: {
          name: "candles",
          version: "1.0",
          params: {
            routingFilters: { active_id: asset, size: interval, only_closed: false }
          }
        }
      };
      this.ws.send(JSON.stringify(subscribeData));
    }
  
    checkMarketStatus() {
      const marketStatusData = {
        name: "get-instruments",
        msg: {
          type: "forex",
          instrument_type: "currency"
        }
      };
      this.ws.send(JSON.stringify(marketStatusData));
  
      this.ws.onmessage = (message) => {
        const data = JSON.parse(message.data);
        if (data.name === "get-instruments") {
          console.log("📢 Market Status:", data.msg);
          if (data.msg.length === 0) {
            console.warn("⚠️ ตลาดปิดอยู่ในขณะนี้!");
          }
        }
      };
    }
  
    getCandles() {
      return this.candles;
    }
  
    keepAlive() {
      setInterval(() => {
        if (this.isConnected) {
          this.ws.send(JSON.stringify({ name: "ping" }));
        }
      }, 1000);
    }
  
    reconnect() {
      console.log("🔄 Reconnecting to IQ Option WebSocket...");
      this.connect();
    }
  }
  
  export default IQOptionAPI;
  