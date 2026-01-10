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
import { useLazyCalculateNPcardQuery } from "../../../store/calculate/calculateApi";
import { BuildChartLine } from "../BuildChartLine";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const ControlChartNP = () => {
  const [calculate, { isLoading }] = useLazyCalculateNPcardQuery();
  const [npValues, setNpValues] = useState<number[]>([]);
  const [npBar, setNpBar] = useState<number | null>(null);
  const [controlLimits, setControlLimits] = useState<{
    UCL: number;
    LCL: number;
  }>({ UCL: 0, LCL: 0 });

  const handleClick = async () => {
    try {
      const result = await calculate().unwrap();
      setNpValues(result.npValues);
      setNpBar(result.npBar);
      setControlLimits(result.controlLimits);
    } catch (error) {
      console.error("Ошибка при получении данных:", error);
    }
  };

  if (!npValues.length) {
    return (
      <BuildChartLine
        text="NP-карты"
        handleClick={handleClick}
        isLoading={isLoading}
      />
    );
  }

  const labels = npValues.map((_, i) => `Подгруппа ${i + 1}`);

  // Цвет точек: красный если вышли за пределы
  const pointBackgroundColors = npValues.map((v) =>
    v > controlLimits.UCL || v < controlLimits.LCL ? "red" : "blue"
  );

  const chartData = {
    labels,
    datasets: [
      {
        label: "Число дефектов (np)",
        data: npValues,
        borderColor: "blue",
        backgroundColor: pointBackgroundColors,
        tension: 0.2,
        pointRadius: 6,
      },
      {
        label: "Среднее np̄",
        data: Array(npValues.length).fill(npBar),
        borderColor: "black",
        borderDash: [5, 5],
        pointRadius: 0,
      },
      {
        label: "UCL",
        data: Array(npValues.length).fill(controlLimits.UCL),
        borderColor: "red",
        borderDash: [5, 5],
        pointRadius: 0,
      },
      {
        label: "LCL",
        data: Array(npValues.length).fill(controlLimits.LCL),
        borderColor: "red",
        borderDash: [5, 5],
        pointRadius: 0,
      },
    ],
  };

  return (
    <div style={{ width: "900px", margin: "0 auto" }}>
      <h2>np-карта (число дефектов)</h2>
      <div style={{ width: "100%", height: "500px", marginBottom: "30px" }}>
        <Line data={chartData} />
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
