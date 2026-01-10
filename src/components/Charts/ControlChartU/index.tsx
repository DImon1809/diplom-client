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
import { useLazyCalculateUcardQuery } from "../../../store/calculate/calculateApi";
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

export const ControlChartU = () => {
  const [calculate, { isLoading }] = useLazyCalculateUcardQuery();
  const [uValues, setUValues] = useState<number[]>([]);
  const [uBar, setUBar] = useState<number | null>(null);
  const [controlLimits, setControlLimits] = useState<
    { UCL: number; LCL: number }[]
  >([]);

  const handleClick = async () => {
    try {
      const result = await calculate().unwrap();
      setUValues(result.uValues);
      setUBar(result.uBar);
      setControlLimits(result.controlLimits);
    } catch (error) {
      console.error("Ошибка при получении данных:", error);
    }
  };

  if (!uValues.length) {
    return (
      <BuildChartLine
        text="U-карту"
        handleClick={handleClick}
        isLoading={isLoading}
      />
    );
  }

  const labels = uValues.map((_, i) => `Подгруппа ${i + 1}`);

  // Цвет точек: красный если вышли за пределы
  const pointBackgroundColors = uValues.map((v, i) =>
    v > controlLimits[i].UCL || v < controlLimits[i].LCL ? "red" : "blue"
  );

  const chartData = {
    labels,
    datasets: [
      {
        label: "Дефекты на единицу (u)",
        data: uValues,
        borderColor: "blue",
        backgroundColor: pointBackgroundColors,
        tension: 0.2,
        pointRadius: 6,
      },
      {
        label: "Среднее ū",
        data: Array(uValues.length).fill(uBar),
        borderColor: "black",
        borderDash: [5, 5],
        pointRadius: 0,
      },
      {
        label: "UCL",
        data: controlLimits.map((c) => c.UCL),
        borderColor: "red",
        borderDash: [5, 5],
        pointRadius: 0,
      },
      {
        label: "LCL",
        data: controlLimits.map((c) => c.LCL),
        borderColor: "red",
        borderDash: [5, 5],
        pointRadius: 0,
      },
    ],
  };

  return (
    <div style={{ width: "900px", margin: "0 auto" }}>
      <h2>U-карта (дефекты на единицу)</h2>
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
