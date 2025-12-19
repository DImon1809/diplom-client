import React, { useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useLazyCalculateXRmiddleQuery } from "../../../store/calculate/calculateApi";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface DataItem {
  xbar: number;
  r: number;
}

export const ControlChart: React.FC = () => {
  const [calculate, { isLoading }] = useLazyCalculateXRmiddleQuery();
  const [chartData, setChartData] = useState<DataItem[]>([]);
  const [XbarLimits, setXbarLimits] = useState<{
    UCL: number;
    LCL: number;
  } | null>(null);
  const [Rlimits, setRlimits] = useState<{ UCL: number; LCL: number } | null>(
    null
  );

  const handleClick = async () => {
    try {
      const result = await calculate().unwrap();

      // Устанавливаем данные и пределы из ответа сервера
      setChartData(result.chartData);
      setXbarLimits(result.XbarLimits);
      setRlimits(result.Rlimits);
    } catch (error) {
      console.error("Ошибка при получении данных:", error);
    }
  };

  if (!chartData.length) {
    return (
      <div>
        <button onClick={handleClick} disabled={isLoading}>
          {isLoading ? "Загрузка..." : "Построить контрольные карты"}
        </button>
      </div>
    );
  }

  const labels = chartData.map((_, i) => `Подгруппа ${i + 1}`);

  // Данные для графика X̄
  const xbarChartData = {
    labels,
    datasets: [
      {
        label: "X̄ (Среднее)",
        data: chartData.map((d) => d.xbar),
        borderColor: "blue",
        backgroundColor: "blue",
        tension: 0.2,
      },
      {
        label: "UCL",
        data: Array(chartData.length).fill(XbarLimits?.UCL),
        borderColor: "red",
        borderDash: [5, 5],
        pointRadius: 0,
      },
      {
        label: "LCL",
        data: Array(chartData.length).fill(XbarLimits?.LCL),
        borderColor: "red",
        borderDash: [5, 5],
        pointRadius: 0,
      },
    ],
  };

  // Данные для графика R
  const rChartData = {
    labels,
    datasets: [
      {
        label: "R (Размах)",
        data: chartData.map((d) => d.r),
        borderColor: "green",
        backgroundColor: "green",
        tension: 0.2,
      },
      {
        label: "UCL R",
        data: Array(chartData.length).fill(Rlimits?.UCL),
        borderColor: "red",
        borderDash: [5, 5],
        pointRadius: 0,
      },
      {
        label: "LCL R",
        data: Array(chartData.length).fill(Rlimits?.LCL),
        borderColor: "red",
        borderDash: [5, 5],
        pointRadius: 0,
      },
    ],
  };

  return (
    <div style={{ width: "900px", margin: "0 auto" }}>
      <h2>Контрольная карта X̄ (Средние)</h2>
      <div style={{ width: "100%", height: "500px", marginBottom: "50px" }}>
        <Line data={xbarChartData} />
      </div>

      <h2>Контрольная карта R (Размахи)</h2>
      <div style={{ width: "100%", height: "500px", marginBottom: "30px" }}>
        <Line data={rChartData} />
      </div>

      <button
        onClick={handleClick}
        disabled={isLoading}
        style={{ padding: "10px 20px", fontSize: "16px" }}
      >
        {isLoading ? "Загрузка..." : "Обновить данные"}
      </button>
    </div>
  );
};
