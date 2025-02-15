import React, { useState, useEffect } from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, TimeScale, Title, Tooltip, Legend } from "chart.js";
import "chartjs-adapter-date-fns";
import { Chart } from "react-chartjs-2";
import { CandlestickController, CandlestickElement } from "chartjs-chart-financial";
import IQOptionAPI from "../services/IQOptionAPI"; // ✅ ใช้ API IQ Option

ChartJS.register(CategoryScale, LinearScale, TimeScale, CandlestickController, CandlestickElement, Title, Tooltip, Legend);

const TradingChart = () => {
  const [candles, setCandles] = useState([]);

  useEffect(() => {
    const iqAPI = new IQOptionAPI("YOUR_IQ_OPTION_TOKEN"); // 🔥 ใส่ API Token ของ IQ Option

    iqAPI.connect().then(() => {
      iqAPI.subscribeCandles("GBPUSD", 60); // ✅ ดึงแท่งเทียน 1 นาที
    });

    const interval = setInterval(() => {
      const candleData = iqAPI.getCandles().map(entry => ({
        x: new Date(entry.time * 1000), // ✅ ใช้ timestamp จาก IQ Option
        o: entry.open,
        h: entry.max,
        l: entry.min,
        c: entry.close,
      }));

      setCandles(candleData);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ backgroundColor: "#000", padding: "10px", color: "#0f0", textAlign: "center", width: "390px", height: "320px", border: "3px solid #0f0", borderRadius: "10px" }}>
      <h3 style={{ fontSize: "20px", color: "#0f0", margin: "5px 0" }}>📊 GBP/USD (IQ Option Real-time)</h3>
      <Chart
        type="candlestick"
        data={{
          datasets: [
            {
              label: "GBP/USD Price",
              data: candles,
              borderColor: "#fff",
              borderWidth: 1,
              color: {
                up: "green",
                down: "red",
                unchanged: "gray",
              },
              parsing: false,
            }
          ],
        }}
        options={{
          responsive: false,
          maintainAspectRatio: false,
          scales: {
            x: {
              type: "time",
              time: { unit: "minute", tooltipFormat: "HH:mm" },
              ticks: { color: "#fff", font: { size: 12 } },
            },
            y: {
              ticks: { color: "#fff", font: { size: 12 } },
              min: Math.min(...candles.map(c => c.l)) - 0.001,
              max: Math.max(...candles.map(c => c.h)) + 0.001,
            }
          },
          plugins: { legend: { display: false } }
        }}
        width={390}
        height={280}
      />
    </div>
  );
};

export default TradingChart;
