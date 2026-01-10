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
import { useLazyCalculateCcardQuery } from "../../../store/calculate/calculateApi";
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

export const ControlChartC: React.FC = () => {
  const [calculate, { isLoading }] = useLazyCalculateCcardQuery();
  const [cValues, setCValues] = useState<number[]>([]);
  const [cBar, setCBar] = useState<number | null>(null);
  const [controlLimits, setControlLimits] = useState<{
    UCL: number;
    LCL: number;
  }>({ UCL: 0, LCL: 0 });

  const handleClick = async () => {
    try {
      const result = await calculate().unwrap();
      setCValues(result.cValues);
      setCBar(result.cBar);
      setControlLimits(result.controlLimits);
    } catch (error) {
      console.error("Ошибка при получении данных:", error);
    }
  };

  if (!cValues.length) {
    return (
      <BuildChartLine
        text="C-карты"
        handleClick={handleClick}
        isLoading={isLoading}
      />
    );
  }

  const labels = cValues.map((_, i) => `Подгруппа ${i + 1}`);

  const pointBackgroundColors = cValues.map((v) =>
    v > controlLimits.UCL || v < controlLimits.LCL ? "red" : "blue"
  );

  const chartData = {
    labels,
    datasets: [
      {
        label: "Число дефектов (c)",
        data: cValues,
        borderColor: "blue",
        backgroundColor: pointBackgroundColors,
        tension: 0.2,
        pointRadius: 6,
      },
      {
        label: "Среднее c̄",
        data: Array(cValues.length).fill(cBar),
        borderColor: "black",
        borderDash: [5, 5],
        pointRadius: 0,
      },
      {
        label: "UCL",
        data: Array(cValues.length).fill(controlLimits.UCL),
        borderColor: "red",
        borderDash: [5, 5],
        pointRadius: 0,
      },
      {
        label: "LCL",
        data: Array(cValues.length).fill(controlLimits.LCL),
        borderColor: "red",
        borderDash: [5, 5],
        pointRadius: 0,
      },
    ],
  };

  return (
    <div style={{ width: "900px", margin: "0 auto" }}>
      <h2>C-карта (число дефектов на единицу)</h2>
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
