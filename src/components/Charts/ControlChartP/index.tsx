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
import { useLazyCalculatePcardQuery } from "../../../store/calculate/calculateApi";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const ControlChartP: React.FC = () => {
  const [calculate, { isLoading }] = useLazyCalculatePcardQuery();
  const [pValues, setPValues] = useState<number[]>([]);
  const [pBar, setPBar] = useState<number | null>(null);
  const [controlLimits, setControlLimits] = useState<
    { UCL: number; LCL: number }[]
  >([]);

  const handleClick = async () => {
    try {
      const result = await calculate().unwrap();
      setPValues(result.pValues);
      setPBar(result.pBar);
      setControlLimits(result.controlLimits);
    } catch (error) {
      console.error("Ошибка при получении данных:", error);
    }
  };

  if (!pValues.length) {
    return (
      <div>
        Нажмите для построения P-карту
        <button onClick={handleClick} disabled={isLoading}>
          {isLoading ? "Загрузка..." : "Построить P-карту"}
        </button>
      </div>
    );
  }

  const labels = pValues.map((_, i) => `Подгруппа ${i + 1}`);
  const uclData = controlLimits.map((lim) => lim.UCL);
  const lclData = controlLimits.map((lim) => lim.LCL);

  const pointBackgroundColors = pValues.map((p, i) =>
    p > uclData[i] || p < lclData[i] ? "red" : "blue"
  );

  const chartData = {
    labels,
    datasets: [
      {
        label: "Доля несоответствий",
        data: pValues,
        borderColor: "blue",
        backgroundColor: pointBackgroundColors,
        tension: 0.2,
        pointRadius: 6,
      },
      {
        label: "Среднее p̄",
        data: Array(pValues.length).fill(pBar),
        borderColor: "black",
        borderDash: [5, 5],
        pointRadius: 0,
      },
      {
        label: "UCL",
        data: uclData,
        borderColor: "red",
        borderDash: [5, 5],
        pointRadius: 0,
      },
      {
        label: "LCL",
        data: lclData,
        borderColor: "red",
        borderDash: [5, 5],
        pointRadius: 0,
      },
    ],
  };

  return (
    <div style={{ width: "900px", margin: "0 auto" }}>
      <h2>P-карта (доля несоответствующих единиц)</h2>
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
