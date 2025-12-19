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
import { useLazyCalculateMRcardQuery } from "../../../store/calculate/calculateApi";

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
  median: number;
  r: number;
}

export const ControlChartMR = () => {
  const [calculate, { isLoading }] = useLazyCalculateMRcardQuery();
  const [chartData, setChartData] = useState<DataItem[]>([]);
  const [Mlimits, setMlimits] = useState<{ UCL: number; LCL: number } | null>(
    null
  );
  const [Rlimits, setRlimits] = useState<{ UCL: number; LCL: number } | null>(
    null
  );

  const handleClick = async () => {
    try {
      const result = await calculate().unwrap();
      setChartData(result.chartData);
      setMlimits(result.Mlimits);
      setRlimits(result.Rlimits);
    } catch (error) {
      console.error("Ошибка при получении данных:", error);
    }
  };

  if (!chartData.length) {
    return (
      <div>
        Нажмите для построения M–R
        <button onClick={handleClick} disabled={isLoading}>
          {isLoading ? "Загрузка..." : "Построить M–R карту"}
        </button>
      </div>
    );
  }

  const labels = chartData.map((_, i) => `Подгруппа ${i + 1}`);

  const medianChartData = {
    labels,
    datasets: [
      {
        label: "Медиана",
        data: chartData.map((d) => d.median),
        borderColor: "blue",
        backgroundColor: "blue",
        tension: 0.2,
      },
      {
        label: "UCL",
        data: Array(chartData.length).fill(Mlimits?.UCL),
        borderColor: "red",
        borderDash: [5, 5],
        pointRadius: 0,
      },
      {
        label: "LCL",
        data: Array(chartData.length).fill(Mlimits?.LCL),
        borderColor: "red",
        borderDash: [5, 5],
        pointRadius: 0,
      },
    ],
  };

  const rChartData = {
    labels,
    datasets: [
      {
        label: "Размах",
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
      <h2>Контрольная карта медиан</h2>
      <div style={{ width: "100%", height: "500px", marginBottom: "50px" }}>
        <Line data={medianChartData} />
      </div>

      <h2>Контрольная карта размахов</h2>
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
