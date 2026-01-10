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
import { useLazyCalculateCusumcardQuery } from "../../../store/calculate/calculateApi";
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

export const ControlChartCUSUM: React.FC = () => {
  const [calculate, { isLoading }] = useLazyCalculateCusumcardQuery();
  const [numbers, setNumbers] = useState<number[]>([]);
  const [Cplus, setCplus] = useState<number[]>([]);
  const [Cminus, setCminus] = useState<number[]>([]);
  const [H, setH] = useState<number | null>(null);

  const handleClick = async () => {
    try {
      const result = await calculate().unwrap();
      setNumbers(result.numbers);
      setCplus(result.Cplus);
      setCminus(result.Cminus);
      setH(result.H);
    } catch (error) {
      console.error("Ошибка при получении данных:", error);
    }
  };

  if (!numbers.length) {
    return (
      <BuildChartLine
        text="CUSUM"
        handleClick={handleClick}
        isLoading={isLoading}
      />
    );
  }

  const labels = numbers.map((_, i) => `Индивидуум ${i + 1}`);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Накопленное превышение",
        data: Cplus,
        borderColor: "blue",
        backgroundColor: "blue",
        tension: 0.2,
      },
      {
        label: "Накопленное занижение",
        data: Cminus,
        borderColor: "green",
        backgroundColor: "green",
        tension: 0.2,
      },
      {
        label: "UCL/LCL",
        data: Array(numbers.length).fill(H),
        borderColor: "red",
        borderDash: [5, 5],
        pointRadius: 0,
      },
      {
        label: "LCL",
        data: Array(numbers.length).fill(-(H ?? 0)),
        borderColor: "red",
        borderDash: [5, 5],
        pointRadius: 0,
      },
    ],
  };

  return (
    <div style={{ width: "900px", margin: "0 auto" }}>
      <h2>CUSUM карта</h2>
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
