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
import { useLazyCalculateXScardQuery } from "../../../store/calculate/calculateApi";
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

type Props = { productId: string; forbiddenText: string };

interface DataItem {
  xbar: number;
  s: number;
}

export const ControlChartXS = ({ productId, forbiddenText }: Props) => {
  const [calculate, { isLoading }] = useLazyCalculateXScardQuery();

  const [chartData, setChartData] = useState<DataItem[]>([]);
  const [XbarLimits, setXbarLimits] = useState<{
    UCL: number;
    LCL: number;
  } | null>(null);
  const [Slimits, setSlimits] = useState<{ UCL: number; LCL: number } | null>(
    null
  );

  const handleClick = async () => {
    try {
      const result = await calculate().unwrap();

      setChartData(result.chartData);
      setXbarLimits(result.XbarLimits);
      setSlimits(result.Slimits);
    } catch (error) {
      console.error("Ошибка при получении данных:", error);
    }
  };

  if (!chartData.length) {
    return (
      <BuildChartLine
        text="X̄–S"
        handleClick={handleClick}
        isLoading={isLoading}
        forbiddenText={forbiddenText}
      />
    );
  }

  const labels = chartData.map((_, i) => `Подгруппа ${i + 1}`);

  // ===== X̄-карта =====
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

  const sChartData = {
    labels,
    datasets: [
      {
        label: "S (Стандартное отклонение)",
        data: chartData.map((d) => d.s),
        borderColor: "green",
        backgroundColor: "green",
        tension: 0.2,
      },
      {
        label: "UCL S",
        data: Array(chartData.length).fill(Slimits?.UCL),
        borderColor: "red",
        borderDash: [5, 5],
        pointRadius: 0,
      },
      {
        label: "LCL S",
        data: Array(chartData.length).fill(Slimits?.LCL),
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

      <h2>Контрольная карта S (Стандартные отклонения)</h2>
      <div style={{ width: "100%", height: "500px", marginBottom: "30px" }}>
        <Line data={sChartData} />
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
