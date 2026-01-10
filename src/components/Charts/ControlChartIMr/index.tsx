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
import { useLazyCalculateIMRcardQuery } from "../../../store/calculate/calculateApi";
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

interface DataItem {
  value: number;
  MR: number | null;
}

export const ControlChartIMR: React.FC = () => {
  const [calculate, { isLoading }] = useLazyCalculateIMRcardQuery();
  const [chartData, setChartData] = useState<DataItem[]>([]);
  const [ILimits, setILimits] = useState<{ UCL: number; LCL: number } | null>(
    null
  );
  const [MRlimits, setMRlimits] = useState<{ UCL: number; LCL: number } | null>(
    null
  );

  const handleClick = async () => {
    try {
      const result = await calculate().unwrap();
      setChartData(result.chartData);
      setILimits(result.ILimits);
      setMRlimits(result.MRlimits);
    } catch (error) {
      console.error("Ошибка при получении данных:", error);
    }
  };

  if (!chartData.length) {
    return (
      <BuildChartLine
        text="I–MR"
        handleClick={handleClick}
        isForbidden={chartData.length < 100}
        isLoading={isLoading}
      />
    );
  }

  const labels = chartData.map((_, i) => `Индивидуум ${i + 1}`);

  const iChartData = {
    labels,
    datasets: [
      {
        label: "Индивидуальные значения",
        data: chartData.map((d) => d.value),
        borderColor: "blue",
        backgroundColor: "blue",
        tension: 0.2,
      },
      {
        label: "UCL",
        data: Array(chartData.length).fill(ILimits?.UCL),
        borderColor: "red",
        borderDash: [5, 5],
        pointRadius: 0,
      },
      {
        label: "LCL",
        data: Array(chartData.length).fill(ILimits?.LCL),
        borderColor: "red",
        borderDash: [5, 5],
        pointRadius: 0,
      },
    ],
  };

  const mrChartData = {
    labels: labels.slice(1),
    datasets: [
      {
        label: "Скользящие размахи",
        data: chartData.slice(1).map((d) => d.MR),
        borderColor: "green",
        backgroundColor: "green",
        tension: 0.2,
      },
      {
        label: "UCL MR",
        data: Array(chartData.length - 1).fill(MRlimits?.UCL),
        borderColor: "red",
        borderDash: [5, 5],
        pointRadius: 0,
      },
      {
        label: "LCL MR",
        data: Array(chartData.length - 1).fill(MRlimits?.LCL),
        borderColor: "red",
        borderDash: [5, 5],
        pointRadius: 0,
      },
    ],
  };

  return (
    <div style={{ width: "900px", margin: "0 auto" }}>
      <h2>I-карта (индивидуальные значения)</h2>
      <div style={{ width: "100%", height: "500px", marginBottom: "50px" }}>
        <Line data={iChartData} />
      </div>

      <h2>MR-карта (скользящие размахи)</h2>
      <div style={{ width: "100%", height: "500px", marginBottom: "30px" }}>
        <Line data={mrChartData} />
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
